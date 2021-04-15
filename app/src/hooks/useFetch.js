import { useState, useEffect } from 'react';

export default function useFetch(url, args) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(200);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await fetch(url, args);
            setStatus(response.status);
            if (response.status !== 200) {
                return setError(true);
            }
            const data = await response.json();
            setData(data);
            setLoading(false);
        })();
    }, [url, args]);

    return { loading, data, status, error };
}
