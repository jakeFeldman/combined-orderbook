import { useEffect,useRef } from 'react';

type IntervalFunction = () => ( unknown | void )

/**
 * useInterval hook borrows from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export const useInterval = (callback: IntervalFunction, delay: number) => {
    const savedCallback = useRef<IntervalFunction| null>(null);

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        const tick = () => {
            if (savedCallback.current !== null) {
                savedCallback.current();
            }
        };

        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
};
