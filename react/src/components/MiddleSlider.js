import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/MiddleSlider.css";

const MiddleSlider = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <Slider {...sliderSettings}>
            <div>
                <img src="images/slider/1.jpg" alt="Slide 1" style={{ width: "100%" }} />
            </div>
            <div>
                <img src="/images/slider/2.jpg" alt="Slide 2" style={{ width: "100%" }} />
            </div>
            <div>
                <img src="/images/slider/3.jpg" alt="Slide 3" style={{ width: "100%" }} />
            </div>
        </Slider>
    );
};

export default MiddleSlider;
