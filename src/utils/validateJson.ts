const validateJson = (input: string, output: string) => {
    const jsonRegex = /\.json$/;
    if (!jsonRegex.test(input) || !jsonRegex.test(output)) throw new Error("Both files must be .json files!");
};

export default validateJson;
