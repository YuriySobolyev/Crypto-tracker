import React, { useContext, useState, useEffect } from 'react';
import selectedCryptoContext, { INTERVALS } from "../store/selectedCryptoContext.jsx";
import cryptoListContext from "../store/cryptoListContext.jsx";
import { useFavoriteCrypto } from "../store/favoriteCryptoContext";
import "../styles/Crypto.scss";
import LineChart from "../component/LineChart.jsx";
import CryptoTable from "../component/CryptoTable.jsx";

const OPTIONS_HOUR_MINUTE = { hour: 'numeric', minute: 'numeric' };
const OPTIONS_MONTH_DAY = { day: 'numeric', month: 'long' };
const OPTIONS_MONTH_YEAR = { year: 'numeric', month: 'short', day: 'numeric' };

const Crypto = () => {
    const ctx = useContext(selectedCryptoContext);
    const cryptos = useContext(cryptoListContext).cryptoList;
    const { favorites } = useFavoriteCrypto();
    const [searchPhrase, setSearchPhrase] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const [showOnlyFavorites, setShowOnlyFavorites] = useState(() => {
        const saved = localStorage.getItem("showOnlyFavorites");
        return saved === "true";
    });

    const activeTab = showOnlyFavorites ? "favorites" : "all";

    useEffect(() => {
        const savedInterval = localStorage.getItem("selectedInterval") || "1D";
        if (cryptos.length === 0 || !favorites) return;

        const activeList = showOnlyFavorites
            ? cryptos.filter(c => favorites.includes(c.id))
            : cryptos;

        if (activeList.length === 0) return;

        const savedId = ctx.selectedIds[activeTab];
        const targetId = savedId && activeList.some(c => c.id === savedId)
            ? savedId
            : activeList[0]?.id;

        if (targetId) {
            ctx.getHistory(targetId, savedInterval, activeTab);
        }
    }, [showOnlyFavorites, cryptos, favorites]);

    const onSearchPhraseChange = (event) => {
        setSearchPhrase(event.target.value);
        let matched = cryptos.filter((crypto) => {
            const lowerCaseInput = event.target.value.toLowerCase();
            return (
                crypto.symbol.toLowerCase().includes(lowerCaseInput) ||
                crypto.name.toLowerCase().includes(lowerCaseInput)
            );
        });
        setSuggestions(event.target.value === "" ? [] : matched.slice(0, 5));
    };

    const selectedSearchedCrypto = (cryptoId) => {
        ctx.getHistory(cryptoId, ctx.interval, activeTab);
        setSearchPhrase("");
        setSuggestions([]);
    };

    const generateLabels = () => {
        const options =
            ctx.interval === '1D'
                ? OPTIONS_HOUR_MINUTE
                : ctx.interval === '1W' || ctx.interval === '1M'
                    ? OPTIONS_MONTH_DAY
                    : OPTIONS_MONTH_YEAR;

        return ctx.history.map(item => {
            const date = new Date(item.date);
            return date.toLocaleString("en-GB", options);
        });
    };

    return (
        <main className='main'>
            <section className='search'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchPhrase}
                    onChange={onSearchPhraseChange}
                />
                {suggestions.length > 0 && (
                    <ul className="suggestion">
                        {suggestions.map(crypto => (
                            <li
                                key={crypto.id}
                                onClick={() => selectedSearchedCrypto(crypto.id)}
                            >
                                {`${crypto.name} (${crypto.symbol})`}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <LineChart
                    data={ctx.history.map(item => item.priceUsd)}
                    labels={generateLabels()}
                    selectedCrypto={cryptos.find(crypto => crypto.id === ctx.selectedIds[activeTab])}
                />
                <div className='crypto_intervals'>
                    {Object.keys(INTERVALS).map((interval) => (
                        <button
                            className={`interval-btn ${interval === ctx.interval ? "active" : ""}`}
                            onClick={() => {
                                ctx.getHistory(ctx.selectedIds[activeTab], interval, activeTab);
                                localStorage.setItem("selectedInterval", interval);
                            }}
                            key={interval}
                        >
                            {interval}
                        </button>
                    ))}
                </div>
            </section>

            <section>
                <div className="crypto_table-title">
                    <h3
                        className={!showOnlyFavorites ? "active-tab" : ""}
                        onClick={() => {
                            setShowOnlyFavorites(false);
                            localStorage.setItem("showOnlyFavorites", "false");
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        Top Coins
                    </h3>
                    <h3
                        className={showOnlyFavorites ? "active-tab" : ""}
                        onClick={() => {
                            setShowOnlyFavorites(true);
                            localStorage.setItem("showOnlyFavorites", "true");
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        Favorites ★
                    </h3>
                </div>

                <CryptoTable
                    showOnlyFavorites={showOnlyFavorites}
                    activeTab={activeTab}
                    selectedId={ctx.selectedIds[activeTab]}
                    onSelect={(id) => {
                        ctx.getHistory(id, ctx.interval, activeTab);
                    }}
                />
            </section>
        </main>
    );
};

export default Crypto;