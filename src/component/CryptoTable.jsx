import React, {useState, useContext} from "react";
import selectedCryptoContext from "../store/selectedCryptoContext.jsx";
import cryptoListContext from "../store/cryptoListContext.jsx";
import {useFavoriteCrypto} from "../store/favoriteCryptoContext";

function CryptoTable({showOnlyFavorites, activeTab, selectedId, onSelect}) {
    const {cryptoList} = useContext(cryptoListContext);
    const {getHistory} = useContext(selectedCryptoContext);
    const {toggleFavorite, isFavorite} = useFavoriteCrypto();

    const [visibleCount, setVisibleCount] = useState(10);
    const [sortConfig, setSortConfig] = useState({key: "rank", direction: "asc"});

    const handleSort = (key) => {
        setSortConfig((prevConfig) => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
        }));
    };

    const showMore = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };

    const filteredList = showOnlyFavorites
        ? cryptoList.filter((crypto) => isFavorite(crypto.id))
        : cryptoList;

    const sortedCryptoList = [...filteredList].sort((a, b) => {
        const aValue = sortConfig.key === "rank" ? parseInt(a[sortConfig.key]) : a[sortConfig.key];
        const bValue = sortConfig.key === "rank" ? parseInt(b[sortConfig.key]) : b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    return (
        <div className="crypto_table-wrapper" key={activeTab}>
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
                        className={`crypto_table_item ${selectedId === crypto.id ? "selected" : ""}`}
                        key={crypto.id}
                        onClick={() => {
                            onSelect(crypto.id);
                            getHistory(crypto.id);
                            window.scrollTo({top: 0, behavior: "smooth"});
                        }}
                    >
                        <ul className="crypto_table_item-rank">
                            <li>{parseInt(crypto.rank)}</li>
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
                                        e.stopPropagation();
                                        toggleFavorite(crypto.id);
                                    }}
                                    className="favorite-button"
                                    style={{
                                        background: "none",
                                        border: "none",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        // color: isFavorite(crypto.id) ? "gold" : "#ccc",
                                        color: crypto.changePercent24Hr >= 0 ? "#56e372" : "#e65c5c",
                                    }}
                                    title="Toggle favorite"
                                >
                                    {/*{isFavorite(crypto.id) ? "★" : "☆"}*/}
                                    {isFavorite(crypto.id) ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 32 32">
                                            <path fill="currentColor" d="M24 2H8a2 2 0 0 0-2 2v26l10-5.054L26 30V4a2 2 0 0 0-2-2" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 32 32">
                                            <path fill="currentColor" d="M24 4v22.75l-7.1-3.59l-.9-.45l-.9.45L8 26.75V4zm0-2H8a2 2 0 0 0-2 2v26l10-5l10 5V4a2 2 0 0 0-2-2" />
                                        </svg>
                                    )}
                                </button>
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>

            {visibleCount < filteredList.length && (
                <button onClick={showMore} className="show_more_button">
                    Show More
                </button>
            )}
        </div>
    );
}

export default CryptoTable;