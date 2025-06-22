import React from 'react';
import FlashSaleSection from './homeComponents/FlashSaleSection';
import CategorySection from './homeComponents/CategorySection';
import ProductsSection from './homeComponents/ProductsSection';
import NewReleaseSection from './homeComponents/NewReleaseSection';
import ServicesSection from './homeComponents/ServicesSection';
import SideNavigation from './homeComponents/SideNavigation';
import PromoBanner from './homeComponents/PromoBanner';
import TopProductsSection from './homeComponents/TopProductsSection';
import styles from "../../assets/css/homeStyles/homePage.module.css";
import useCustomer from "../../hooks/useCustomer";


const HomePage: React.FC = () => {
    return (
        <div className={styles.homepage}>
            <PromoBanner/>
            <SideNavigation/>
            <main className={styles.main}>
                <div className={styles.container}>
                    <FlashSaleSection/>
                    <CategorySection/>
                    <TopProductsSection/>
                    <ProductsSection/>
                    <NewReleaseSection/>
                    <ServicesSection/>
                </div>
            </main>
        </div>

    );
};

export default HomePage;
