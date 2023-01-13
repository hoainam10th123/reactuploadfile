import { ChangeEvent, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import agent from "../api/agent";

export default function Upload() {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    //const [currentFile, setCurrentFile] = useState<File | undefined>(undefined);
    const [progress, setProgress] = useState(0);

    const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        setSelectedFiles(files);
    };

    const upload = () => {
        if (selectedFiles) {
            let currentFile = selectedFiles[0];
            setProgress(0);

            let formData = new FormData();
            formData.append('files', currentFile)

            agent.Files.uploadFiles(formData, (event: any) => {
                setProgress(Math.round((100 * event.loaded) / event.total));
            });
        }
    };

    return (
        <>
            <label className="btn btn-default">
                <input type="file" onChange={selectFile} />
            </label>
            <button
                className="btn btn-success"
                disabled={!selectedFiles}
                onClick={upload}
            >
                Upload
            </button>
            <ProgressBar now={progress} label={`${progress}%`}/>
        </>
    );
}