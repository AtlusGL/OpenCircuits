import {Header} from "shared/containers/Header";
import {HeaderPopups} from "shared/state/Header/state";
import {Dropdown} from "shared/containers/Header/Right/Dropdown";

import {CircuitInfoHelpers} from "shared/utils/CircuitInfoHelpers";

type Tool = {
    popupName: HeaderPopups;
    img: string;
    text: string;
}

function getExtraTools(): Tool[] {
    return [
        { 
            popupName: "expr_to_circuit",
            img: "img/icons/bool_expr_input_icon.svg",
            text: "Boolean Expression to Circuit"
        }
    ];
}

type Props = {
    img: string;
    helpers: CircuitInfoHelpers;
}

export const DigitalHeader = ({ img, helpers }: Props) => (
    <Header img={img} helpers={helpers} extraTools={getExtraTools()} />
);
