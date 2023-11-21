import {createContext, useState} from "react";
import API from "../API";

const cryptoListContext = createContext({})

export const CryptoListProvider = (props) => {
    const [cryptoList, setCryptoList] = useState([]);

    const getCryptoList = () => {
        API.get("/assets")
            .then((res) => {
                setCryptoList(res.data.data);
            })
            .catch((error) => {
                setCryptoList([])
                console.log(error);
            });
    };

    const values = {
        cryptoList: cryptoList,
        getCryptoList: getCryptoList,
    }
    return (
        <cryptoListContext.Provider value={values}>
            {props.children}
        </cryptoListContext.Provider>
    );
}

export default cryptoListContext