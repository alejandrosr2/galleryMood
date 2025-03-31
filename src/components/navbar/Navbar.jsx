import React from "react";

const Navbar = ({ dominantColor, onUpload }) => {
    // Función para calcular el brillo del color
    const getColorBrightness = (rgb) => {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    // Función para ajustar el color (oscurecer o aclarar)
    const adjustColorBrightness = (rgb, factor) => {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        const adjust = (value) => Math.min(255, Math.max(0, value * factor));
        return `rgb(${adjust(r)}, ${adjust(g)}, ${adjust(b)})`;
    };
    // Calcular si el color dominante es claro u oscuro
    const brightness = getColorBrightness(dominantColor);

    const textColor = brightness > 128 ? adjustColorBrightness(dominantColor, 0.5) : adjustColorBrightness(dominantColor, 1.8);
    const borderColor = brightness > 128 ? adjustColorBrightness(dominantColor, 0.7) : adjustColorBrightness(dominantColor, 1.8);

    return (
        <>
            <div className="fixed top-[56px] right-0 left-0" >
                <div
                    className="flex justify-between gap-14 items-center mx-auto max-w-screen-sm px-4 border-b pb-1 border-l transition-all duration-500 rounded z-40"
                    style={{ color: textColor, borderColor: borderColor }} 
                >
                    <h1 className="text-2xl font-bold">GalleryMood</h1>
                    <div className="flex gap-10 text-lg font-semibold">
                        <label htmlFor="file-upload" className="cursor-pointer" style={{ color: textColor }}>
                            Upload Photo
                        </label>
                        <input 
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onUpload}
                        />
                    </div>
                </div>
            </div>
            {/* Borde inferior */}
            <div className="fixed top-[68px] right-2 left-0  pointer-events-none">
                <div className="flex gap-14 items-center mx-auto max-w-screen-sm px-4 border-b-2 pb-1 border-l-2 rounded" style={{ color: textColor, borderColor: borderColor }}>
                    <h1 className="invisible">GalleryMood</h1>
                    <p className="invisible">Home</p>
                    <p className="invisible">Your Gallery</p>
                </div>
            </div>
        </>
    );
};

export default Navbar;
