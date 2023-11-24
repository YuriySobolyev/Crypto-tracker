import {useContext, useEffect} from "react";
import Crypto from "./pages/Crypto.jsx";
import selectedCryptoContext from "./store/selectedCryptoContext.jsx";
import cryptoListContext from "./store/cryptoListContext.jsx";
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