import React, {useContext} from 'react';
import selectedCryptoContext from "../store/selectedCryptoContext.jsx";
import cryptoListContext from "../store/cryptoListContext.jsx";

function CryptoTable() {
    const {cryptoList} = useContext(cryptoListContext);
    const {getHistory} = useContext(selectedCryptoContext);

    return (
        <ul className="crypto_table">
            <li className="crypto_table_header">
                <span className="crypto_table_header__symbol">Coin</span>
                <span className="crypto_table_header__price">Price</span>
                <span className="crypto_table_header__change">24Hr %</span>
            </li>
            {cryptoList.slice(0, 10).map((crypto) => (
                <li className="crypto_table_item" key={crypto.id} onClick={() => getHistory(crypto.id)}>
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
                    <ul className="crypto_table_item__change" style={{color: crypto.changePercent24Hr >= 0 ? "#56e372" : "#e65c5c",}}>
						<li>{crypto.changePercent24Hr > 0 ? `${'↗'}` : '↘'} {Math.round(crypto.changePercent24Hr * 100) / 100} &nbsp;%</li>
					</ul>
                </li>
            ))}
        </ul>
    );
}

export default CryptoTable;