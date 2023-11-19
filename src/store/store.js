import {SelectedCryptoProvider} from "./selectedCryptoContext";
import {CryptoListProvider} from "./cryptoListContext";

export default function store(props) {
    return (
        <CryptoListProvider>
            <SelectedCryptoProvider>
                {props.children}
            </SelectedCryptoProvider>
        </CryptoListProvider>
    )
}