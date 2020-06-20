import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        const item =
            typeof window !== "undefined"
                ? window.localStorage.getItem(key)
                : undefined;
        return item ? JSON.parse(item) : initialValue;
    });

    const setValue = (value) => {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    return [storedValue, setValue];
};

export { useLocalStorage };
