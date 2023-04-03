import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
import { toast } from "react-toastify";

interface IFileProps {
    limit: number;
    multiple: boolean;
    name: string;
}

type FileUpload = "pdf" | "doc" | "docx" | "pptx";

const UploadFile: React.FC<IFileProps> = ({ limit, multiple, name }) => {

    const {
        control,
        formState: { isSubmitting, errors },
    } = useFormContext();

    const { field } = useController({ name, control });
    const [singleFile, setSingleFile] = useState<File[]>([]);
    const [fileList, setFileList] = useState<File[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // ? Toggle the dragover class
    const onDragEnter = () => wrapperRef.current?.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');

    // ? Upload Services
    const onFileDrop = useCallback(
        (e: React.SyntheticEvent<EventTarget>) => {
            const target = e.target as HTMLInputElement;
            if (!target.files) return;

            if (limit === 1) {
                const newFile = Object.values(target.files).map((file: File) => file)
                if (singleFile.length === 1) return console.log("Only upload one file.")
                setSingleFile(newFile);
                field.onChange(newFile[0])
            }

            if (multiple) {
                const newFiles = Object.values(target.files).map((file: File) => file)
                if (newFiles) {
                    const updatedList = [...fileList, ...newFiles]
                    if (updatedList.length > limit || newFiles.length > limit) {
                        return toast.error("Limits files uploaded.")
                    }
                    setFileList(updatedList)
                    field.onChange(updatedList)
                }
            }
        },
        [field, fileList, limit, multiple, singleFile]
    )

    // ? remove multipe file
    const fileRemove = (file: File) => {
        const updatedList = [...fileList]
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
    }

    // ? remove single file
    const fileSingleRemove = (file: File) => {
        setSingleFile([])
    }

    // ? handle calc MB or KB files
    const calcSize = (size: number) => {
        return size < 1000000
            ? `${Math.floor(size / 1000)} KB`
            : `${Math.floor(size / 1000000)} MB`;
    };

    // ? Reset the state
    useEffect(() => {
        if (isSubmitting) {
            setFileList([]);
            setSingleFile([]);
        }
    }, [isSubmitting])

    return (
        <>
            <div className="flex items-center justify-center w-full" ref={wrapperRef} onDragEnter={onDragEnter} onDragLeave={onDragLeave}
                onDrop={onDragLeave}>
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <Controller name={name} defaultValue="" control={control} render={({ field: { name, onBlur, ref } }) => (
                        <input name={name} ref={ref} onBlur={onBlur} onChange={onFileDrop}
                            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, application/ppt, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation"
                            multiple={multiple} id="dropzone-file" type="file" className="hidden" />
                    )} />
                </label>
            </div>
        </>
    )
}

export default UploadFile;