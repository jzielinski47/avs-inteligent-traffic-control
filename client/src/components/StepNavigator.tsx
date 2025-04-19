import React from "react";
import HUIButton from "./HUIButton";

interface IStepNav {
    step: number;
    handleNextStep: () => void;
    handlePreviousStep: () => void;
}

const StepNavigator = ({ step, handleNextStep, handlePreviousStep }: IStepNav) => {
    return (
        <div className="flex w-full items-center flex-col">
            <p>
                Step: <span className="text-primary">{step as React.ReactNode}</span>
            </p>
            <div className="flex flex-row gap-2">
                <HUIButton action={handlePreviousStep}>Previous step</HUIButton>
                <HUIButton action={handleNextStep}>Next step</HUIButton>
            </div>
        </div>
    );
};

export default StepNavigator;
