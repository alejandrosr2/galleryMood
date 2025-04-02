import { createContext, useState } from "react";

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    const [dominantColor, setDominantColor] = useState(null);
    const [brightness, setBrightness] = useState(0);

    const getColorBrightness = (rgb) => {
        if (!rgb) return 0;

        const match = rgb.match(/\d+/g);
        if (!match) return 0;

        const [r, g, b] = match.map(Number);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const adjustColorBrightness = (rgb, factor) => {
        if (!rgb) return rgb;

        const match = rgb.match(/\d+/g);
        if (!match) return rgb;

        const [r, g, b] = match.map(Number);
        const adjust = (value) => Math.min(255, Math.max(0, value * factor));
        return `rgb(${adjust(r)}, ${adjust(g)}, ${adjust(b)})`;
    };

    return (
        <ColorContext.Provider value={{ dominantColor, setDominantColor, brightness, setBrightness,getColorBrightness, adjustColorBrightness }}>
            {children}
        </ColorContext.Provider>
    );
};

export default ColorContext;
