import React from "react";
import StepNavProps from "../types/interfaces/stepNavProps.interface";
import HButton from "./HUIButton";

const StepNavigator = ({ step, handleNextStep, handlePreviousStep }: StepNavProps) => {
    return (
        <div className="flex w-full items-center flex-col">
            <p>
                Step: <span className="text-primary">{step as React.ReactNode}</span>
            </p>
            <div className="flex flex-row gap-2">
                <HButton action={handlePreviousStep}>Previous step</HButton>
                <HButton action={handleNextStep}>Next step</HButton>
            </div>
        </div>
    );
};

export default StepNavigator;
