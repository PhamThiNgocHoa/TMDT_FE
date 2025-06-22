import React, {useState} from "react";
import "./components/css/CustomProductServicePage.css";
import PromoBanner from "../../page/homePage/homeComponents/PromoBanner";
import CustomSidebar from "./components/CustomSidebar";
import TopHotProductsSection from "./components/TopHotProductsSection";
import CustomCategorySection from "./components/CustomCategorySection";
import FeaturedProductsSection from "./components/FeaturedProductsSection";
import CustomBenefitsSection from "./components/CustomBenefitsSection";
import CustomServiceList from "./components/CustomServiceList";
import useCategory from "../../hooks/useCategory";
import CustomHandBookList from "./components/CustomHandBookList";
import useProduct from "../../hooks/useProduct";


const CustomProductServicePage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const {categories} =useCategory();
    const {products} = useProduct();
    return (
        <div className="custom-page-layout">
            <CustomSidebar/>
            <main className="custom-main-content">
                <PromoBanner/>
                <CustomCategorySection
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    customCategories={categories}
                />
                {selectedCategory !== "Dịch vụ custom" && <TopHotProductsSection selectedCategory={selectedCategory}/>}
                {selectedCategory !== "Dịch vụ custom" &&  <FeaturedProductsSection selectedCategory={selectedCategory} />}
                {selectedCategory === "Dịch vụ custom" && (
                    <>
                        {categories.map((category) => (
                            <CustomServiceList
                                key={category.id}
                                categoryName={category.name}
                            />
                        ))}
                        <CustomHandBookList products={products}/>

                    </>
                )}
                <CustomBenefitsSection/>
            </main>
        </div>
    );
};

export default CustomProductServicePage;
