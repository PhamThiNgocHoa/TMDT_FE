import React from 'react';
import ProductsSection from './shopComponents/ProductsSection';
import SideNavigation from './shopComponents/SideNavigation';
import PromoBanner from './shopComponents/PromoBanner';
import './shopPage.css'; // Import đúng tệp CSS của bạn

const HomePage: React.FC = () => {
    return (
        <div className="homepage">
            <PromoBanner />
            <main className="main">
                <SideNavigation />
                <div>
                    <ProductsSection />
                </div>
            </main>
        </div>
    );
};

export default HomePage;
