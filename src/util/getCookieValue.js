export const getCookieValue = (
  identifier = "",
  type = "",
  showConsoleFlag = false
) => {
  const obj = Object.fromEntries(
    document.cookie.split("; ").map((v) => v.split("=").map(decodeURIComponent))
  );
  if (showConsoleFlag) console.log(obj);

  if (obj[identifier]) {
    if (type === "J") return JSON.parse(obj[identifier]);
    if (type === "I") return parseInt(obj[identifier]);
    else return obj[identifier];
  } else return false;
};
