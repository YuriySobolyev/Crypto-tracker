import React, {useContext} from 'react';
import selectedCryptoContext from "../store/selectedCryptoContext";
import cryptoListContext from "../store/cryptoListContext";

function CryptoTable(props) {
    const {cryptoList} = useContext(cryptoListContext);
    const {getHistory} = useContext(selectedCryptoContext);
    return (
        <ul className="crypto_table">
            <li className="crypto_table_header">
                <span className="crypto_table_header__symbol">Symbol</span>
                <span className="crypto_table_header__name">Name</span>
                <span className="crypto_table_header__price">Price</span>
                <span className="crypto_table_header__change">Change(24Hr)</span>
                <span className="crypto_table_header__change_percent">Change %</span>
            </li>
            {cryptoList.slice(0,10).map((crypto) => (
                <li className="crypto_table_item" key={crypto.id} onClick={() => getHistory(crypto.id)}>
                    <span className="crypto_table_item__symbol">
                        <img
                            src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`}
                            alt="Crypto_img"
                        />
                    </span>
                    <span className="crypto_table_item__name">{crypto.name}</span>
                    <span className="crypto_table_item__price">
							$
                        {Math.round(
                            crypto.priceUsd *
                            100
                        ) / 100}</span>
                    <span
                        style={{
                            color:
                                crypto.changePercent24Hr >=
                                0
                                    ? "#56e372"
                                    : "#e65c5c",
                        }}>
							{Math.round(
                                crypto.changePercent24Hr *
                                100
                            ) / 100}
                        %
						</span>
                </li>
            ))}
        </ul>
    );
}

export default CryptoTable;