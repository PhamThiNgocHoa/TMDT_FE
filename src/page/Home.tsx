import React from 'react';
import '../assets/css/home.css';
import anhtest from '../assets/image/anhtest.png';

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
                <div className="slider-image">
                    <img src={anhtest} alt="Slider Image 1" />
                </div>
                <div className="slider-image">
                    <img src={anhtest} alt="Slider Image 2" />
                </div>
                <div className="slider-image">
                    <img src={anhtest} alt="Slider Image 3" />
                </div>
            </div>
        </div>
    );
};

export default Home;