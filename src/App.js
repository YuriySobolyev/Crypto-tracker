import {useContext, useEffect} from "react";
import Crypto from "./pages/Crypto";
import selectedCryptoContext from "./store/selectedCryptoContext";
import cryptoListContext from "./store/cryptoListContext";
import './styles/App.scss';

function App() {
    const selectedCryptoCTX = useContext(selectedCryptoContext);
    const cryptoListCTX = useContext(cryptoListContext);

    useEffect(() => {
            cryptoListCTX.getCryptoList();
            selectedCryptoCTX.getHistory('bitcoin');
        },
        []);
    return (
        <div className="App">
            <Crypto/>
        </div>
    );
}

export default App;
