import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface TranslateState {
    type: string ;
    sourceLang: string ;
    targetLang: string ;
    text_input: string;
    text_output: string;
}

const initialState: TranslateState = {
    type: "Typing",
    sourceLang: "Korean",
    targetLang: "Vietnamese",
    text_input: "",
    text_output: "",
}

export const translateSlice = createSlice({
    name: "translate",
    initialState,
    reducers: {
        changeLanguage: (
            state,
            action: PayloadAction<{target: string, value: string}>
        ) => {
            if (action.payload.target === "source") {
                state.sourceLang = action.payload.value
            } else {
                state.targetLang = action.payload.value
            }
        },
        switchLanguage: (
            state,
        ) => {
            const _sourceLang = state.sourceLang;
            state.sourceLang = state.targetLang
            state.targetLang = _sourceLang
        },
        setText: (
            state,
            action: PayloadAction<{target: string, value: string}>
        ) => {
            if (action.payload.target === "text_source") {
                state.text_input = action.payload.value
            } else {
                state.text_output = action.payload.value
            }
        },
        setTyping: (
            state,
            action: PayloadAction<{value: string}>
        ) => {
            state.type = action.payload.value
        }
    }
})

export const selectTranslate = (state:RootState) => state.translate;

export const { changeLanguage, switchLanguage, setText, setTyping } = translateSlice.actions;

export default translateSlice.reducer;
