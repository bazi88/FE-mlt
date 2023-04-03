import React, { useEffect, useState } from "react";
import Nav from "../../widget/Nav";
import Body from "../../widget/Body";
import "./index.css"
import { useNavigate } from "react-router-dom";
import { languages, Language, typings, Ityping, languages_SelectInput } from "../../data/constantData";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTranslate, changeLanguage, switchLanguage, setText, setTyping } from "../../features/translateSlice";
import { useDebounce } from 'use-debounce';
import { useTextTranslateMutation } from "../../services/translateApi";
import { toast } from "react-toastify";
import TextArea from "../../widget/TextArea";
import UploadFile from "../../widget/UploadFile";

const TranslateText = () => {
    const { type, sourceLang, targetLang, text_input, text_output } = useAppSelector(selectTranslate)
    const [typing] = useDebounce(text_input, 800);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [
        postTranslateText,
        {
            data: translateData,
            isSuccess: isTranslateSuccess,
            isError: isTranslateError,
            error: translateError
        }
    ] = useTextTranslateMutation();

    const changeTyping = (event: any) => {
        dispatch(setTyping({ value: event.target.value }))
    }

    useEffect(() => {
        handleTranslateText()
    }, [typing])


    const tranferLanguage = (lang: string): string => {
        const value = languages.find((ln) => ln.value === lang);
        if (value) {
            return value.name;
        } else {
            return "auto"
        }
    }

    const tranferLangServer = (lang: string): string => {
        const lang_server = languages.find((ln) => ln.name === lang);
        if (lang_server) {
            return lang_server.value
        } else {
            return languages_SelectInput[0].value;
        }
    }

    useEffect(() => {
        dispatch(setText({ target: "text_output", value: translateData?.translated_text }))
        dispatch(changeLanguage({ target: "source", value: tranferLangServer(translateData?.detected_source_lang) }))
    }, [isTranslateSuccess])

    const handleTranslateText = async () => {
        if (type === typings[0].value) {
            await callTranslateText();
        }
    }

    const callTranslateText = async () => {
        const target_language = tranferLanguage(targetLang);
        const source_language = tranferLanguage(sourceLang);
        //case typings
        await postTranslateText({ content: text_input, target: target_language, source: source_language })
    }

    return (
        <>
            <Nav></Nav>
            <Body title="Translate documents and typing word letters.">
                <>
                    <div className="w-full flex flex-col md:flex-row">
                        <div className="h-full flex-1 md:flex-initial md:w-32">
                            Translate Type:
                        </div>
                        <div className="h-full flex-1">
                            <div className="switch-field">
                                {
                                    typings.map((typing: Ityping, index) => {
                                        return (
                                            < >
                                                <input type="radio" id={index.toString()} name="switch-one" value={typing.value} onChange={changeTyping} checked={typing.value === type} />
                                                <label htmlFor={index.toString()}>{typing.value}</label>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row ">
                        <div className="h-full flex flex-1 ">
                            <div className="md:flex-initial md:w-32">
                                Form Language:
                            </div>
                            <div className="flex flex-1 ">
                                <select defaultValue={sourceLang} onChange={(event) => {
                                    dispatch(changeLanguage({ target: "source", value: event.target.value }))
                                    callTranslateText()
                                }}>
                                    {languages_SelectInput.map((lang: Language, index: number) => {
                                        return (
                                            <option
                                                key={index} value={lang.value} selected={lang.value === sourceLang}>{lang.label}</option>
                                        )
                                    })}
                                </select>
                                <div className="flex flex-1 flex-row justify-between px-2 md:px-4">
                                    {languages.map((lang: Language, index: number) => {
                                        return (
                                            <div onClick={() => dispatch(changeLanguage({ target: "source", value: lang.value }))}>{lang.value}</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="h-full flex flex-1 md:flex-initial justify-center mx-4">
                            <button onClick={() => {
                                dispatch(switchLanguage())
                                callTranslateText()
                            }} name="button">Switch Language</button>
                        </div>
                        <div className="h-full flex flex-1 ">
                            <div className="md:flex-initial md:w-32">
                                To Language:
                            </div>
                            <div className="flex flex-1 ">
                                <select defaultValue={targetLang} onChange={(event) => {
                                    dispatch(changeLanguage({ target: "target", value: event.target.value }))
                                    callTranslateText()
                                }}>
                                    {languages.map((lang: Language, index: number) => {
                                        return (
                                            <option
                                                key={index} value={lang.value} selected={lang.value === targetLang}>{lang.label}</option>
                                        )
                                    })}
                                </select>
                                <div className="flex flex-1 flex-row justify-between px-2 md:px-4">
                                    {languages.map((lang: Language, index: number) => {
                                        return (
                                            <div onClick={() => dispatch(changeLanguage({ target: "target", value: lang.value }))}>{lang.value}</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row gap-x-8 gap-y-4">
                        {
                            type === "Typing" ? (
                                <>
                                    <div className="flex-1">
                                        <TextArea typeInput="in" />
                                    </div><div className="flex-1">
                                        <TextArea typeInput="out" />
                                    </div>
                                </>
                            ) : (<>
                                <div className="flex-1">
                                    <UploadFile limit={50} multiple name={"file"}></UploadFile>
                                </div>
                            </>)
                        }
                    </div>
                </>
            </Body>
        </>
    )
}
export default TranslateText;
