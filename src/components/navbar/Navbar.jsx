import React from "react";
import useColor from "../../hook/useColor";

const Navbar = ({ onUpload }) => {
    const { dominantColor, getColorBrightness, adjustColorBrightness } = useColor();

    if (!dominantColor) {
        return (
            <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50">
                <div className="text-xl font-bold text-black">Loading...</div>
            </div>
        );
    }

    const brightness = getColorBrightness(dominantColor);
    const textColor = brightness > 128 ? adjustColorBrightness(dominantColor, 0.5) : adjustColorBrightness(dominantColor, 1.8);
    const borderColor = brightness > 128 ? adjustColorBrightness(dominantColor, 0.7) : adjustColorBrightness(dominantColor, 1.8);

    return (
        <div className="fixed top-[56px] right-0 left-0">
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
    );
};

export default Navbar;
