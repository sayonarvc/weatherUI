export const createElement = (tagName, className, textContent = '') => {
    const element = document.createElement(tagName);
    element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
};

export const createImageElement = (className, src) => {
    const element = document.createElement('img');
    element.className = className;
    element.src = src;
    return element;
};

export const formatTimeFromTimestamp = (timestamp, withSeconds = false) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (withSeconds) {
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    return `${hours}:${minutes}`;
};