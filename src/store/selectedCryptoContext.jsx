import { createContext, useState, useEffect } from "react";
import API from "../API.jsx";

const DEFAULT_INTERVAL = "1D";
export const INTERVALS = {
    "1D": 1,
    "1W": 7,
    "1M": 30,
    "6M": 180,
    "1Y": 365,
};

const selectedCryptoContext = createContext({});

export const SelectedCryptoProvider = (props) => {
    const [history, setHistory] = useState([]);
    const [selectedInterval, setInterval] = useState(DEFAULT_INTERVAL);
    const [selectedIds, setSelectedIds] = useState({
        all: null,
        favorites: null
    });

    useEffect(() => {
        const savedIds = localStorage.getItem("selectedIds");
        if (savedIds) setSelectedIds(JSON.parse(savedIds));
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedIds", JSON.stringify(selectedIds));
    }, [selectedIds]);

    const getCryptoHistory = async (cryptoId, interval = selectedInterval, tab = "all") => {
        if (!cryptoId) return;

        const intervalKey = interval === DEFAULT_INTERVAL ? "h1" : "d1";
        const start = new Date();
        start.setDate(start.getDate() - INTERVALS[interval]);
        const end = new Date();
        const url = `/assets/${cryptoId}/history?interval=${intervalKey}&start=${start.getTime()}&end=${end.getTime()}`;

        try {
            const response = await API.get(url);
            setHistory(response.data.data);
            setInterval(interval);
            setSelectedIds(prev => ({
                ...prev,
                [tab]: cryptoId
            }));
        } catch (e) {
            console.error("Ошибка загрузки истории:", e);
        }
    };

    const values = {
        history,
        getHistory: getCryptoHistory,
        selectedIds,
        interval: selectedInterval,
    };

    return (
        <selectedCryptoContext.Provider value={values}>
            {props.children}
        </selectedCryptoContext.Provider>
    );
};


export default selectedCryptoContext;
