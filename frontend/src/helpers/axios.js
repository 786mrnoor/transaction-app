export default async function axios(url, options) {
  const res = await fetch(url, options);
  if (res.redirected) {
    window.location.href = res.url;
    return;
  }
  return res.json();
}
