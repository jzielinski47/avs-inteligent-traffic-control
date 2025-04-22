import Command from "./command.interface";

interface InputPanelProps {
    inputData: Command[];
    readInputFile: (e: React.FormEvent<HTMLInputElement>) => void;
    handleDataImport: () => void;
    logMessage: string;
    canSimulate?: boolean;
    isUploaded?: boolean;
    isSimulated?: boolean;
}

export default InputPanelProps