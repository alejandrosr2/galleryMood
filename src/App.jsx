import { useState } from 'react';
import './App.css'
import Gallery from './components/gallery/Galley'
import Navbar from './components/navbar/Navbar'

function App() {

  const [images, setImages] = useState([
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
  ]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prevImages) => [...prevImages, imageUrl]);
    }
  };

  return (
    <>
      <nav>
        <Navbar onUpload={handleUpload}/>
      </nav>
      <main>
        <Gallery images={images}/>
      </main>
    </>
  )
}

export default App
