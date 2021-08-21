import {IO_PORT_RADIUS, LEFT_MOUSE_BUTTON} from "core/utils/Constants";

import {Event} from "core/utils/Events";
import {CircuitInfo} from "core/utils/CircuitInfo";

import {EventHandler} from "../EventHandler";
import {CreateDeselectAllAction, SelectAction} from "core/actions/selection/SelectAction";
import {GroupAction} from "core/actions/GroupAction";
import {GetAllPorts} from "core/utils/ComponentUtils";
import {Component, Port, Wire} from "core/models";
import {ShiftAction} from "core/actions/ShiftAction";
import {Circle} from "core/rendering/shapes/Circle";
import {HoverAction} from "core/actions/HoverAction";


export const HoverHandler: EventHandler = ({
    conditions: (event: Event, {}: CircuitInfo) =>
        (event.type === "mouseenter"),

    getResponse: ({input, camera, history, designer, selections}: CircuitInfo) => {
        const action = new GroupAction();
        const worldMousePos = camera.getWorldPos(input.getMousePos());

        const ports = GetAllPorts(designer.getObjects());
        const objs = designer.getAll() as (Component | Wire)[];
        //const objsp: Port = new Port;

        // Check if an object was clicked
        const obj = objs.find(o => o.isWithinSelectBounds(worldMousePos));

        // If we clicked a port and also hit a wire,
        //  we want to prioritize the port, so skip selecting
        if (!(ports.some(p => p.isWithinSelectBounds(worldMousePos)))) {

            // Select object
            if (obj instanceof Component || obj instanceof Wire){
                let tmp = obj.getCullBox().getPos();
                action.add(new HoverAction(selections,obj));
                // display a tiny not
                // draw(new Circle(tmp, IO_PORT_RADIUS/3), circleStyle);
                const derender = (!selections.has(obj));
                action.add(new SelectAction(selections, obj, derender).execute());

            }
        }

        // https://github.com/OpenCircuits/OpenCircuits/issues/622
        if (!action.isEmpty())
            history.add(action);
    }
});
