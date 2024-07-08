export const checkCache = (key) => {
    const keys = JSON.parse(window.localStorage.getItem("keys")) || [];
    return keys.includes(key);
}

export const getCacheValue = (key) => {
    const values = JSON.parse(window.localStorage.getItem("values")) || [];
    const valueObject = values.find(item => item.key === key);
    return valueObject ? valueObject.value : null;
}
