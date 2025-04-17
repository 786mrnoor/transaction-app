import { useCallback, useEffect, useState } from "react";

export default function useAsyncState(reducer, init, effect) {
    const [data, setData] = useState(init);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        async function get() {
            try {
                setLoading(true);
                const data = await effect();
                if (!ignore) {
                    setData(data);
                }
            } catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        get();

        return () => {
            ignore = true;
        }
    }, [effect])

    const dispatch = useCallback(async (type, payload) => {
        try {
            setLoading(true);
            setError(null);
            const data = await reducer(type, payload);
            setData(data);
            return true;
        } catch (error) {
            console.log(error);
            setError(error);
            return false;
        }
        finally {
            setLoading(false);
        }
    }, [reducer]);

    return [data, dispatch, loading, error];
};
