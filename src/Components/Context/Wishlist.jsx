import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("olx_wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("olx_wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (item) => {
        setWishlist((prev) => {
            const isExist = prev.find((i) => i.id === item.id);
            if (isExist) {
                return prev.filter((i) => i.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };

    const isInWishlist = (id) => {
        return wishlist.some((item) => item.id === id);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
