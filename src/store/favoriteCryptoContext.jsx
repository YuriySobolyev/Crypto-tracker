import { createContext, useContext, useEffect, useState } from "react";

const FavoriteCryptoContext = createContext();

export const FavoriteCryptoProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });


    useEffect(() => {
        try {
            const stored = localStorage.getItem("favorites");
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setFavorites(parsed.filter(id => typeof id === "string"));
                } else {
                    localStorage.removeItem("favorites");
                }
            }
        } catch (e) {
            console.error("Ошибка загрузки избранных:", e);
            localStorage.removeItem("favorites");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id) => {
        if (!id || typeof id !== "string") return;
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter(coin => coin !== id) : [...prev, id]
        );
    };

    const isFavorite = (id) => favorites.includes(id);

    return (
        <FavoriteCryptoContext.Provider
            value={{ favorites, toggleFavorite, isFavorite }}
        >
            {children}
        </FavoriteCryptoContext.Provider>
    );
};

export const useFavoriteCrypto = () => useContext(FavoriteCryptoContext);