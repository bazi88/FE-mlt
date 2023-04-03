import { IconProps } from "react-toastify";

export interface Language {
    value: string;
    label: string;
    name: string;
}

export interface Ityping {
    value: string;
    icon: IconProps | null;
}

export const languages_SelectInput : Language[] = [
    { value: "Detect Language", label: "Detect Language", name: "auto"},
    { value: "Korean", label: "Korean", name: "ko_KR" },
    { value: "English", label: "English", name: "en_XX" },
    { value: "Vietnamese", label: "Vietnamese", name: "vi_VN" },
];

export const languages : Language[] = [
    { value: "Korean", label: "Korean", name: "ko_KR" },
    { value: "English", label: "English", name: "en_XX" },
    { value: "Vietnamese", label: "Vietnamese", name: "vi_VN" },
]

export const typings: Ityping[] = [
    { value: "Typing", icon: null },
    { value: "Documentation", icon: null },
]

const BASE_URL : string = "http://192.168.137.129"
export const TRANSLATE_IP: string = `${BASE_URL}:8000/`
export const AUTHENTICATION_IP: string = `${BASE_URL}:8001/`