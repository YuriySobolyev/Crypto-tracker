import React, { useState, useContext } from "react";
import selectedCryptoContext from "../store/selectedCryptoContext.jsx";
import cryptoListContext from "../store/cryptoListContext.jsx";
import { useFavoriteCrypto } from "../store/favoriteCryptoContext";

function CryptoTable() {
    const { cryptoList } = useContext(cryptoListContext);
    const { getHistory } = useContext(selectedCryptoContext);

    // Состояние для отслеживания количества отображаемых элементов
    const [visibleCount, setVisibleCount] = useState(10);

    // Состояние для текущего критерия сортировки
    const [sortConfig, setSortConfig] = useState({ key: "rank", direction: "asc" });

    // Функция для сортировки массива
    const sortedCryptoList = [...cryptoList].sort((a, b) => {
        const aValue = sortConfig.key === "rank" ? parseInt(a[sortConfig.key]) : a[sortConfig.key];
        const bValue = sortConfig.key === "rank" ? parseInt(b[sortConfig.key]) : b[sortConfig.key];

        if (aValue < bValue) {
            return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    // Функция для изменения критерия сортировки
    const handleSort = (key) => {
        setSortConfig((prevConfig) => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
        }));
    };

    // Функция для показа больше элементов
    const showMore = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };

    // favorites
    const { favorites, toggleFavorite, isFavorite } = useFavoriteCrypto();

    return (
        <div>
            <ul className="crypto_table">
                <li className="crypto_table_header">
                    <span className="crypto_table_header__rank" onClick={() => handleSort("rank")}>
                        # {sortConfig.key === "rank" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </span>
                    <span className="crypto_table_header__symbol" onClick={() => handleSort("name")}>
                        Coin {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </span>
                    <span className="crypto_table_header__price" onClick={() => handleSort("priceUsd")}>
                        Price {sortConfig.key === "priceUsd" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </span>
                    <span className="crypto_table_header__change" onClick={() => handleSort("changePercent24Hr")}>
                        24Hr % {sortConfig.key === "changePercent24Hr" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </span>
                </li>
                {sortedCryptoList.slice(0, visibleCount).map((crypto) => (
                    <li
                        className="crypto_table_item"
                        key={crypto.id}
                        onClick={() => {
                            getHistory(crypto.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                    >
                        <ul className="crypto_table_item-rank">
                            <li>{parseInt(crypto.rank)}</li> {/* Преобразование rank в число */}
                        </ul>
                        <img
                            src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`}
                            alt="Crypto_img"
                        />
                        <ul className="crypto_table_item-name">
                            <li>{crypto.name}</li>
                            <li className="symbol">{crypto.symbol}</li>
                        </ul>
                        <ul className="crypto_table_item__price">
                            <li>$ {Math.round(crypto.priceUsd * 100) / 100}</li>
                        </ul>
                        <ul
                            className="crypto_table_item__change"
                            style={{
                                color: crypto.changePercent24Hr >= 0 ? "#56e372" : "#e65c5c",
                            }}
                        >
                            <li>
                                {crypto.changePercent24Hr > 0 ? "↗" : "↘"}{" "}
                                {Math.round(crypto.changePercent24Hr * 100) / 100} &nbsp;%
                            </li>
                            <li>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // чтобы не срабатывал onClick родителя
                                        toggleFavorite(crypto.id);
                                    }}
                                    className="favorite-button"
                                    style={{
                                        background: "none",
                                        border: "none",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        color: isFavorite(crypto.id) ? "gold" : "#ccc",
                                    }}
                                    title="Toggle favorite"
                                >
                                    {isFavorite(crypto.id) ? "★" : "☆"}
                                </button>
                            </li>
                        </ul>


                    </li>
                ))}
            </ul>
            {/* Кнопка для показа больше */}
            {visibleCount < cryptoList.length && (
                <button onClick={showMore} className="show_more_button">
                    Show More
                </button>
            )}
        </div>
    );
}

export default CryptoTable;