import LeftArrow from "../assets/arrow/LeftArrow";
import StraightRightArrow from "../assets/arrow/StraightRightArrow";
import { iRoad } from "../types/interfaces/environment.interface";
import decodeColor from "../utils/decodeColor";

interface iDirectionComponent {
    name: string;
    direction: iRoad;
}

const DirectionComponent = ({ name, direction }: iDirectionComponent) => {
    return (
        <div>
            <h3>{name}</h3>
            <p className="text-white/60">Queue: {direction.queue.length}</p>
            <div className="flex flex-row space-between gap-1 mt-1">
                <LeftArrow className={`${decodeColor(direction.priorityLeftSignalLight)} size-8`} />
                <StraightRightArrow className={`${decodeColor(direction.straightRightSignalLight)} size-8`} />
            </div>
        </div>
    );
};

export default DirectionComponent;
