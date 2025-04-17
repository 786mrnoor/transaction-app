export default function debounce(callback, time) {
    let id;
    return function(...args){
        clearTimeout(id);
        id = setTimeout(()=>callback(...args), time);
    }
};
