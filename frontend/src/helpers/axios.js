export default async function axios(url, options) {
    const res = await fetch(url, options);
    if (res.redirected) {
        alert(window.location.href);
        window.location.href = res.url;
        return;
    }
    return res.json();
};
