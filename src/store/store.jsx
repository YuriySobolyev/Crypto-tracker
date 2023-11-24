import {SelectedCryptoProvider} from "./selectedCryptoContext.jsx";
import {CryptoListProvider} from "./cryptoListContext.jsx";

export default function store(props) {
    return (
        <CryptoListProvider>
            <SelectedCryptoProvider>
                {props.children}
            </SelectedCryptoProvider>
        </CryptoListProvider>
    )
}