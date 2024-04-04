import React from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

function Uploder({ setSelectedFile }) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: ['video/mp4'],
        onDropAccepted: (acceptedFiles) => {
            acceptedFiles.forEach(file => {
                alert(file.name);
                setSelectedFile(file); // Update the selected file state
            });
        }
    });

    return (
        <div className="w-full text-center">
            <div {...getRootProps()} className="px-6 pt-5 pb-6 border-2 border-border border-dashed bg-main rounded-md cursor-pointer">
                <input {...getInputProps()} />
                <span className="mx-auto flex-colo text-subMain text-3xl">
                    <FiUploadCloud />
                </span>
                <p className="text-sm mt-2">Drag your video here</p>
                <em className="text-xs text-border">
                    (only .mp4 files will be accepted)
                </em>
            </div>
        </div>
    );
}

export default Uploder;
