import React, {useContext, useState} from 'react';
import selectedCryptoContext, {INTERVALS} from "../store/selectedCryptoContext";
import cryptoListContext from "../store/cryptoListContext";
import "../styles/Crypto.scss";
import LineChart from "../component/LineChart";

const OPTIONS_HOUR_MINUT = {
    hour: '2-digit',
    minute: '2-digit',
}

const OPTIONS_MONTH_DAY = {
    day: 'metric',
    month: 'long',
}

const OPTIONS_MONTH_YEAR = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
};

const Crypto = () => {
    const ctx = useContext(selectedCryptoContext);
    const cryptos = useContext(cryptoListContext).cryptoList;
    const [searhPhrase, setSearchPhrase] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const onSearchPhraseChange = (event) => {
        setSearchPhrase(event.target.value);
        let matched = cryptos.filter(
            (crypto) =>
                crypto.name.toLowerCase().includes(event.target.value.toLowerCase())
        );

        if (matched.length > 5 && event.target.value !== '') {
            matched = matched.slice(0, 5);
        } else if (event.target.value === '') {
            matched = [];
        }
        setSuggestions(matched);
    };

    const selectedSearchedCrypto = (
        cryptoId
    ) => {
        ctx.getHistory(cryptoId);
        setSearchPhrase("");
        setSuggestions([]);
    };

    const generateLabels = () => {
        let options = ctx.interval === ["1H", "1D"] ? OPTIONS_HOUR_MINUT : OPTIONS_MONTH_DAY;
        options = ["6M", "1Y"].includes(ctx.interval) ? OPTIONS_MONTH_YEAR : options;
        return ctx.history.map(item => {
            const date = new Date(item.date);
            return date.toDateString("ru-Ru", options);
        });
    }

    return (
        <main className='main'>
            <section className='search'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searhPhrase}
                    onChange={onSearchPhraseChange}
                />{
                suggestions.length > 0 && <ul>
                    {suggestions.map(crypto =>
                        <li
                            key={crypto.id}
                            onClick={() => ctx.selectedSearchedCrypto(crypto.id)}
                        >
                            {crypto.name}
                        </li>)}
                </ul>
            }
            </section>
            <section>
                <div className='crypto_cart'>
                    {Object.keys(INTERVALS).map(
                        (interval) => (
                            <button className={`interval-btn ${interval === ctx.interval && "active"}`}
                                    onClick={() => {
                                        ctx.getHistory(ctx.selected_id,
                                            interval)
                                    }}
                                    key={interval}
                            >
                                {interval}
                            </button>
                        )
                    )}
                </div>
                <LineChart data={ctx.history.map(item => item.priceUsd)}
                labels={generateLabels(ctx.history)}
                selectedCrypto={cryptos.find(crypto => crypto.id === ctx.selected_id)}
                />
            </section>
        </main>
    );
};

export default Crypto