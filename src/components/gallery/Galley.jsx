import { useState, useEffect } from "react";
import useCanvasColor from "../../hook/useCanvasColor";
import { VscDebugPause, VscDebugStart } from "react-icons/vsc";
import { AiOutlineClockCircle } from "react-icons/ai"; 
import useColor from "../../hook/useColor";


const Gallery = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [intervalSpeed, setIntervalSpeed] = useState(3);

    const { dominantColor, getColorBrightness, adjustColorBrightness } = useColor();
    const { canvasRef } = useCanvasColor(images[currentIndex]);

    useEffect(() => {
        let interval;
        if (!isPaused) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
            }, intervalSpeed * 1000);
        }
        return () => clearInterval(interval);
    }, [isPaused, images, intervalSpeed]);

    const togglePause = () => {
        setIsPaused((prev) => !prev);
    };

    const brightness = dominantColor ? getColorBrightness(dominantColor) : 0;
    const buttonBgColor = brightness > 128 ? adjustColorBrightness(dominantColor, 0.8) : adjustColorBrightness(dominantColor, 1.2);

    return (
        <div className="h-screen flex items-center justify-center transition-all duration-1000 ease-in-out"
            style={{ backgroundColor: dominantColor || "white" }}>
            <div className="w-96 h-72 relative overflow-hidden rounded-lg shadow-lg transition-all duration-1000 ease-in-out">
                <img src={images[currentIndex]} 
                    alt="Gallery"
                    className="object-cover w-full h-full transition-opacity duration-1000 ease-in-out border-2 rounded-lg" 
                    style={{ borderColor: buttonBgColor }}
                />
            </div>
            <canvas ref={canvasRef} className="hidden" />
            {/* Botones de pausar y cambiar velocidad */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                <button onClick={togglePause}
                    className="px-4 py-2 text-white rounded-lg shadow-md flex items-center gap-2"
                    style={{ backgroundColor: buttonBgColor }}>
                    {isPaused ? <VscDebugStart className="size-5" /> : <VscDebugPause className="size-5" />}
                    {isPaused ? "Play" : "Pause"}
                </button>
                <div className="px-4 py-2 text-white rounded-lg shadow-md flex items-center gap-2" 
                    style={{ backgroundColor: buttonBgColor }}>
                    <AiOutlineClockCircle className="text-white size-5"/>
                    <input 
                        type="range" min="1" max="10" value={intervalSpeed}
                        onChange={(e) => setIntervalSpeed(Number(e.target.value))}
                        className="cursor-pointer accent-white bg-white rounded-lg"
                    />
                    <span className="text-white font-semibold">
                        {intervalSpeed}s
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
