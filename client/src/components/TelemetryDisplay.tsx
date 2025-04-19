import { Field, Label, Textarea } from "@headlessui/react";
import Telemetry from "../types/interfaces/telemetry.interface";
import DirectionComponent from "./DirectionComponent";

export const TelemetryDisplay = ({ telemetry }: { telemetry: Telemetry }) => {
    return (
        <>
            <Field className="w-full h-full">
                <Label className="text-sm/6 font-medium text-white">Stats</Label>
                <p>Command: {telemetry?.command?.type}</p>
                <p>Queue lenghts before: {JSON.stringify(telemetry?.stats, null, 2)}</p>
            </Field>
            {telemetry?.command.type === "step" && (
                <>
                    <Field className="w-full h-full">
                        <Label className="text-sm/6 font-medium text-white">Before</Label>

                        <div className="grid grid-cols-4 w-full">
                            {telemetry?.before ? (
                                <>
                                    <DirectionComponent name="North" direction={telemetry?.before?.north} />
                                    <DirectionComponent name="East" direction={telemetry?.before?.east} />
                                    <DirectionComponent name="South" direction={telemetry?.before?.south} />
                                    <DirectionComponent name="West" direction={telemetry?.before?.west} />
                                </>
                            ) : null}
                        </div>
                    </Field>
                    <Field className="w-full h-full">
                        <Label className="text-sm/6 font-medium text-white">Runtime</Label>
                        <div className="grid grid-cols-4 w-full">
                            {telemetry?.runtime ? (
                                <>
                                    <DirectionComponent name="North" direction={telemetry?.runtime?.north} />
                                    <DirectionComponent name="East" direction={telemetry?.runtime?.east} />
                                    <DirectionComponent name="South" direction={telemetry?.runtime?.south} />
                                    <DirectionComponent name="West" direction={telemetry?.runtime?.west} />
                                </>
                            ) : null}
                        </div>
                        <Textarea
                            className={
                                "mt-6 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white" +
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                            }
                            rows={6}
                            name="leftVehicles"
                            value={"vehicles that left the intersection: \n" + telemetry?.leftVehicles}
                            readOnly
                        />
                    </Field>
                    <Field className="w-full h-full">
                        <Label className="text-sm/6 font-medium text-white">After</Label>
                        <div className="grid grid-cols-4 w-full">
                            {telemetry?.after ? (
                                <>
                                    <DirectionComponent name="North" direction={telemetry?.after?.north} />
                                    <DirectionComponent name="East" direction={telemetry?.after?.east} />
                                    <DirectionComponent name="South" direction={telemetry?.after?.south} />
                                    <DirectionComponent name="West" direction={telemetry?.after?.west} />
                                </>
                            ) : null}
                        </div>
                    </Field>
                </>
            )}
        </>
    );
};
