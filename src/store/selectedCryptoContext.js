import {createContext, useState} from "react";
import API from "../API";

const DEFAULT_INTERVAL = "1D";
export const INTERVALS = {
    "1H": 1,
    "1D": 1,
    "1W": 7,
    "1M": 30,
    "6M": 90,
    "1Y": 365,
};

const selectedCryptoContext = createContext({})

export const SelectedCryptoProvider = (props) => {
    const [history, setHistory] = useState([]);
    const [selectedInterval, setInterval] = useState(DEFAULT_INTERVAL);
    const [id, setId] = useState(null);

    const getCryptoHistory = async (id, interval = selectedInterval) => {
        const interval_ = interval === DEFAULT_INTERVAL ? "h2" : "d1";
        const start = new Date();
        start.setDate(start.getDate() - INTERVALS[interval]);
        const end = new Date();
        const url = `/assets/${id}/history?interval=${interval_}&start=${start.getTime()}&end=${end.getTime()}`;
        const response = await API.get(url);
        setHistory(response.data.data);
        setId(id);
        setInterval(interval);
    }

    const values = {
        history: history,
        getHistory: getCryptoHistory,
        selectedId: id,
        interval: selectedInterval,
    };

    return (
        <selectedCryptoContext.Provider value={values}>
            {props.children}
        </selectedCryptoContext.Provider>
    );
};

export default selectedCryptoContext