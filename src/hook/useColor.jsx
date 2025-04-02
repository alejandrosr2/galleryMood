import { useContext } from "react";
import ColorContext from "../context/ColorContext";


const useColor = () => {
    return useContext(ColorContext);
};

export default useColor;
