import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    return (
        <header className="w-full max-w-2xl flex flex-col items-start gap-1 m-2 ">
            <div className="flex flex-row gap-3 items-center">
                <h2 className="font-bold text-2xl">AVS - Intelligent traffic control system</h2>
                <FontAwesomeIcon icon={faCar} bounce className="fa-xl" />
            </div>
            <p className="text-lg text-white/60">by Jakub Zieliński</p>
        </header>
    );
};

export default Header;
