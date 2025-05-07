import React from 'react';
import '../assets/css/home.css';
import slide1 from '../assets/image/slide1.png';
import slide2 from '../assets/image/slide2.png';

const Home = () => {
    return (
        <div className="home-container">
            <div className="menu">
                <ul>
                    <li>Laptop</li>
                    <li>Laptop Gaming</li>
                    <li>PC GVN</li>
                    <li>Main, CPU, VGA</li>
                    <li>Ổ cứng</li>
                    <li>Màn hình</li>
                    <li>Chuột</li>
                    <li>Bàn phím</li>
                    <li>Phụ kiện</li>
                </ul>
            </div>

            <div className="slider">
                {/*<div className="slider-image">*/}
                {/*    <img src={slide1} alt="Slider Image 1" />*/}
                {/*</div>*/}
                <div className="slider-image">
                    <img src={slide2} alt="Slider Image 1" />
                </div>

            </div>



        </div>
    );
};

export default Home;