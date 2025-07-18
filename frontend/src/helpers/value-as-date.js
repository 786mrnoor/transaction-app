export default function valueAsDate(d) {
  let m = d.getMonth() + 1;
  let day = d.getDate();
  return `${d.getFullYear()}-${m < 10 ? '0' + m : m}-${day < 10 ? '0' + day : day}`;
}
