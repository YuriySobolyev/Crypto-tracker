import { SelectedCryptoProvider } from "./selectedCryptoContext.jsx";
import { CryptoListProvider } from "./cryptoListContext.jsx";
import { FavoriteCryptoProvider } from "./favoriteCryptoContext.jsx";

export default function Store(props) {
    return (
        <FavoriteCryptoProvider>
            <CryptoListProvider>
                <SelectedCryptoProvider>
                    {props.children}
                </SelectedCryptoProvider>
            </CryptoListProvider>
        </FavoriteCryptoProvider>
    );
}