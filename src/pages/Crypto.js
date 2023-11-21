import React, {useContext, useState} from 'react';
import selectedCryptoContext, {INTERVALS} from "../store/selectedCryptoContext";
import cryptoListContext from "../store/cryptoListContext";
import "../styles/Crypto.scss";
import LineChart from "../component/LineChart";

const OPTIONS_HOUR_MINUTE = {
    hour: 'numeric', minute: 'numeric',
}

const OPTIONS_MONTH_DAY = {
    day: 'numeric', month: 'long',
}

const OPTIONS_MONTH_YEAR = {
    year: 'numeric', month: 'short', day: 'numeric',
};

const Crypto = () => {
    const ctx = useContext(selectedCryptoContext);
    const cryptos = useContext(cryptoListContext).cryptoList;
    const [searhPhrase, setSearchPhrase] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const onSearchPhraseChange = (event) => {
        setSearchPhrase(event.target.value);
        let matched = cryptos.filter((crypto) => {
            const lowerCaseInput = event.target.value.toLowerCase();
            const symbolMatches = crypto.symbol.toLowerCase().includes(lowerCaseInput);
            const nameMatches = crypto.name.toLowerCase().includes(lowerCaseInput);
            return symbolMatches || nameMatches;
        });

        if (event.target.value === ""){
            matched = []
        }else if(matched.length > 5){
            matched = matched.slice(0,5);
        }
        setSuggestions(matched);
    };

    const selectedSearchedCrypto = (cryptoId) => {
        ctx.getHistory(cryptoId).then();
        setSearchPhrase("");
        setSuggestions([]);
    };

    const generateLabels = () => {
        let options =  ctx.interval === '1D' ? OPTIONS_HOUR_MINUTE : ctx.interval === '1W' || '1M' ? OPTIONS_MONTH_DAY : OPTIONS_MONTH_YEAR;
        return ctx.history.map(item => {
            const date = new Date(item.date);
            return date.toLocaleString(
                "en-GB",
                options
            );
        });
    };

    return (<main className='main'>
        <section className='search'>
            <input
                type='text'
                placeholder='Search...'
                value={searhPhrase}
                onChange={onSearchPhraseChange}
            />{suggestions.length > 0 && <ul className="suggestion">
            {suggestions.map(crypto => <li
                key={crypto.id}
                onClick={() => selectedSearchedCrypto(crypto.id)}
            >
                {`${crypto.name} (${crypto.symbol})`}
            </li>)}
        </ul>}
        </section>
        <section>
            <LineChart data={ctx.history.map(item => item.priceUsd)}
                       labels={generateLabels()}
                       selectedCrypto={cryptos.find(crypto => crypto.id === ctx.selected_id)}
            />
            <div className='crypto_intervals'>
                {Object.keys(INTERVALS).map((interval) => (
                    <button className={`interval-btn ${interval === ctx.interval && "active"}`}
                            onClick={() => {
                                ctx.getHistory(ctx.selected_id, interval).then()
                            }}
                            key={interval}
                    >
                        {interval}
                    </button>))}
            </div>
        </section>
        <section>
            <div className="title">
                <h3>Top Coins</h3>
            </div>
        </section>
    </main>);
};

export default Crypto