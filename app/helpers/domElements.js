import {format} from "date-fns";


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

export const formatTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);

    return format(date, 'HH:mm');
};
