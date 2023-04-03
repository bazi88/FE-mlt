import React from "react";
import { selectTranslate, changeLanguage, switchLanguage, setText, setTyping } from "../features/translateSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type IPropsTextArea = {
    typeInput: string;
}
const TextArea = (props: IPropsTextArea) => {
    const { type, sourceLang, targetLang, text_input, text_output } = useAppSelector(selectTranslate)
    const dispatch = useAppDispatch();

    return (
        <>
            {
                props.typeInput && props.typeInput === "in" ? (<>
                    <textarea className="w-full" name="postContent" value={text_input} rows={10} cols={40} onChange={(event) => dispatch(setText({ target: "text_source", value: event.target.value }))} />
                </>) : (<>
                    <textarea className="w-full" name="postContent" value={text_output} rows={10} cols={40} onChange={(event) => dispatch(setText({ target: "text_output", value: event.target.value }))} />
                </>)
            }
        </>
    )
}
export default TextArea;