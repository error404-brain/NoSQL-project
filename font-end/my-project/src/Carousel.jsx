import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel_img_1 from './assets/download.jpg';
import Carousel_img_2 from './assets/download2.jpg';
import Carousel_img_3 from './assets/download3.jpg';

// Navbar Component
const Navbar = () => {
    return (
        <nav className="bg-red-600 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <a href="#home">Viettel</a> {/* Changed logo text to Viettel */}
                </div>
                <div className="space-x-6">
                    <a href="#home" className="hover:text-gray-200">Home</a>
                    <a href="#about" className="hover:text-gray-200">About</a>
                    <a href="#services" className="hover:text-gray-200">Services</a>
                    <a href="#contact" className="hover:text-gray-200">Contact</a>
                </div>
            </div>
        </nav>
    );
};

// Carousel Component
const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        appendDots: dots => (
            <div style={{ color: 'white', position: 'absolute', bottom: '10px', right: '10px' }}>
                <ul style={{ margin: '0px' }}> {dots} </ul>
            </div>
        ),
    };

    const slides = [
        { id: 1, img: Carousel_img_1, alt: 'Image 1' },
        { id: 2, img: Carousel_img_2, alt: 'Image 2' },
        { id: 3, img: Carousel_img_3, alt: 'Image 3' },
    ];

    return (
        <div>
            <Navbar /> {/* Navbar placed above the carousel */}
            <div className="relative w-full overflow-hidden mt-16"> {/* Adjust margin to prevent overlap with navbar */}
                <Slider {...settings} className="h-full">
                    {slides.map(slide => (
                        <div key={slide.id} className="w-full h-full flex items-center justify-center">
                            {slide.link ? (
                                <a href={slide.link} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={slide.img}
                                        alt={slide.alt}
                                        className="w-full h-64 object-cover"
                                    />
                                </a>
                            ) : (
                                <img
                                    src={slide.img}
                                    alt={slide.alt}
                                    className="w-full h-64 object-cover"
                                />
                            )}
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Carousel;
