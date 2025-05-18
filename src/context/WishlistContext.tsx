import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of a wishlist item (could be just product ID or a full product object)
// For now, let's store product IDs
type WishlistItems = string[];

// Define the shape of the context value
interface WishlistContextType {
    wishlistItems: string[];
    addOrRemoveFromWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;

}

// Create the context with a default undefined value
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Create the provider component
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState<string[]>([]);
    const isInWishlist = (id: string) => wishlistItems.includes(id);
    // Load wishlist from localStorage on mount
    useEffect(() => {
        const storedItems = localStorage.getItem('wishlist');
        if (storedItems) {
            try {
                setWishlistItems(JSON.parse(storedItems));
            } catch (error) {
                console.error('Error parsing wishlist from localStorage:', error);
                setWishlistItems([]);
            }
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addOrRemoveFromWishlist = (id: string) => {
        setWishlistItems(prevItems => {
            const newItems = prevItems.includes(id)
                ? prevItems.filter(item => item !== id)
                : [...prevItems, id];
            return newItems;
        });
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addOrRemoveFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hook to use the Wishlist Context
export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}; 