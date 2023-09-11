import { useState, useRef, useEffect } from "react";
import { IconArrachFile } from "../svg/IconArrachFile";

export const FileButton = ({getFile,image}:{getFile:(f:File) => void,image: File}) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);

 //   console.log(fileInputRef);
    

    const handleFileSelect = () => {
        const fileInput = fileInputRef?.current;
        if (fileInput && fileInput?.files && fileInput.files[0]) {
            const file = fileInput?.files[0];
            getFile(file)
        }
    };

  

    return (
            <label className="ui-file-button">
                {
                    image
                        ? <img className="ui-file-button-image" src={URL.createObjectURL(image)} alt="Вибране зображення" />
                        : <IconArrachFile />
                }
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                />
            </label>
    )
}


