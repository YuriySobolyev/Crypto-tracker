import { createContext, useContext, useEffect, useState } from "react";

const FavoriteCryptoContext = createContext();

export const FavoriteCryptoProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Загрузка из localStorage при инициализации
    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    // Сохранение в localStorage при изменении
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((coin) => coin !== id) : [...prev, id]
        );
    };

    const isFavorite = (id) => favorites.includes(id);

    return (
        <FavoriteCryptoContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoriteCryptoContext.Provider>
    );
};

export const useFavoriteCrypto = () => useContext(FavoriteCryptoContext);
