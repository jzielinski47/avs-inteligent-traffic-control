const SliderTracker = ({ step, maxSteps }: { step: number; maxSteps: number }) => {
    return (
        <div className="w-full h-32">
            <div className="slidecontainer">
                <input
                    type="range"
                    value={step}
                    min={0}
                    max={maxSteps}
                    className="w-full h-2 rounded-lg text-primary appearance-none cursor-pointer bg-level-1 [hover]:opacity-1"
                />
            </div>
        </div>
    );
};

export default SliderTracker;
