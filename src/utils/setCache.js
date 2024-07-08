export const setCacheKey = (key) => {
    const keys = JSON.parse(window.localStorage.getItem("keys")) || [];
    if (!keys.includes(key)) {
        keys.push(key);
        window.localStorage.setItem("keys", JSON.stringify(keys));
    }
}

export const setCacheKeyValue = (key, value) => {
    const values = JSON.parse(window.localStorage.getItem("values")) || [];
    const newValue = { key: key, value: value };
    values.push(newValue);
    window.localStorage.setItem("values", JSON.stringify(values));
}
