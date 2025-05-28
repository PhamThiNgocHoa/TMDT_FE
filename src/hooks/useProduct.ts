import {useEffect, useState} from "react";
import {Product} from "../models/Product";
import {
    getListProduct,
    getProductById,
    getProductSale,
    listFindByName,
    searchProduct
} from "../server/api/product/product.get";
import {ProductResponse} from "../models/response/ProductResponse";

function useProduct() {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [productDetail, setProductDetail] = useState<ProductResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [saleProducts, setSaleProducts] = useState<ProductResponse[]>([]);


    const handleError = (error: unknown) => {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        setError(message);
        throw new Error(message);
    };

    const fetchGetListProduct = async (): Promise<ProductResponse[]> => {
        setLoading(true);
        try {
            const data = await getListProduct();
            setProducts(data);
            return data;
        } catch (error) {
            handleError(error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const fetchGetProductById = async (id: number): Promise<ProductResponse | undefined> => {
        setLoading(true);
        try {
            const data = await getProductById(id);
            console.log(data);
            return data;  // chỉ trả về, không set state trong hook
        } catch (error) {
            handleError(error);
            return undefined;
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProductSale();
                setSaleProducts(data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [getProductSale]);


    const fetchListFindByName = async (name: string): Promise<ProductResponse[]> => {
        setLoading(true);
        try {
            return await listFindByName(name);
        } catch (error) {
            handleError(error);
            return [];
        } finally {
            setLoading(false);
        }
    }

    return {
        products,
        error,
        loading,
        fetchGetListProduct,
        fetchGetProductById,
        setProducts,
        saleProducts, setSaleProducts,
        fetchListFindByName,
        productDetail, setProductDetail,
    };
}

export default useProduct;
