import './Home.css';

import content1 from './assets/Content_1.jfif'; // Import the images
import content2 from './assets/Content_2.jfif';
import content3 from './assets/Content_3.jfif';
import content4 from './assets/Content_4.jfif';
import content5 from './assets/Content_5.jfif';
import content6 from './assets/Content_6.jfif';

// import './StorePreview.css';
import { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import AboutUs from './AboutUs';
import StorePreviewList from './StorePreview';

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [content1, content2, content3, content4, content5, content6]; // Use the imported images

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [images.length]);

    return (
        <div className="HomePage">
            <NavigationBar/>
            <div className="Content">
                <div className="TextSection">
                    <h2>Get your Pokémon today
                        <br />and start your own journey toward greatness!</h2>
                    <p>Imagine yourself alongside fellow trainers, proudly showcasing your newly acquired Pokémon. Each capture represents a thrilling adventure, and today could be your day to join this vibrant community. Don’t miss out on the excitement!</p>
                </div>
                <div className="SlideshowSection">
                    <div
                        className="SlideshowWrapper"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Move left based on current index
                    >
                        {images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="SlideshowImage"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="Store_Previews">
                <h1> <b>CHECK OUT OUR INVENTORY</b></h1>
                <StorePreviewList />
            </div>
            <AboutUs />
            <Footer />
        </div>
    );
}

export default Home;
