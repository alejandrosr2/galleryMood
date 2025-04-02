import { useState, useEffect, useRef } from "react";
import useColor from "./useColor";

const useCanvasColor = (imageSrc) => {
  const { setDominantColor } = useColor();  
  const [dominantColor, setLocalDominantColor] = useState(null);  
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "Anonymous"; 

    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      // Obtención del color dominante
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;
      let r = 0, g = 0, b = 0;
      const totalPixels = data.length / 4;

      // Promediamos los colores
      for (let i = 0; i < totalPixels; i++) {
        r += data[i * 4]; // R
        g += data[i * 4 + 1]; // G
        b += data[i * 4 + 2]; // B
      }

      const newDominantColor = `rgb(${Math.floor(r / totalPixels)}, ${Math.floor(g / totalPixels)}, ${Math.floor(b / totalPixels)})`;

      if (newDominantColor !== dominantColor) {
        setLocalDominantColor(newDominantColor);  
        setDominantColor(newDominantColor);  
      }
    };

    img.onerror = () => {
      console.log("Error cargando la imagen");
    };
  }, [imageSrc, dominantColor, setDominantColor]);

  return { dominantColor, canvasRef };
};

export default useCanvasColor;
