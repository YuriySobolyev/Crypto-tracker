import {useContext, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Crypto from "./pages/Crypto";
import Header from "./component/Header";
import selectedCryptoContext from "./store/selectedCryptoContext";
import cryptoListContext from "./store/cryptoListContext";
import './styles/App.scss';

function App() {
    const selectedCryptoCTX = useContext(selectedCryptoContext);
    const cryptoListCTX = useContext(cryptoListContext);

    useEffect(() => {
        cryptoListCTX.getCryptoList();
        selectedCryptoCTX.getHistory('bitcoin', '1D');
    }, [])
    return (
        <div className="App">
            <Header/>
            <Crypto/>
            <Routes>
                <Route path="/" element={<Crypto/>}/>
            </Routes>
        </div>
    );
}

export default App;
