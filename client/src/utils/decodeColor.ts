const decodeColor = (color: string): string => {
    switch (color) {
        case "red":
            return "fill-red";
        case "yellow":
            return "fill-yellow";
        case "green":
            return "fill-green";
        default:
            return "";
    }
};

export default decodeColor;
