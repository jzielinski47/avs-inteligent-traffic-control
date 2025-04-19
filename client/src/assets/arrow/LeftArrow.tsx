const LeftArrow = ({ fill }: { fill: string }) => {
    return (
        <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            className={`fill-${fill} size-8`}
        >
            <title>LeftArrow</title>
            <path d="M115.56,268.27a25.86,25.86,0,0,1,0-36.54L193,154.29a25.86,25.86,0,0,1,36.54,0l.08-.08a25.84,25.84,0,0,1,0,36.54l-33.39,33.4H314.56A77.46,77.46,0,0,1,392,301.59V327.4a25.82,25.82,0,0,1-51.63,0V301.59a25.79,25.79,0,0,0-25.81-25.82H196.23l33.31,33.4A25.84,25.84,0,0,1,193,345.71Z" />
        </svg>
    );
};

export default LeftArrow;
