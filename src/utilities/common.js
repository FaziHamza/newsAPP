//  Parses a string and removes everything between start string and end string, including them
export const removeBetween = (string, startStr, endStr) => {
  while (string.includes(startStr)) {
    const indexFirst = string.indexOf(startStr);
    const slicedString = string.slice(indexFirst + startStr.length);
    const indexLast = slicedString.indexOf(endStr);
    const trimmedString = slicedString.substring(0, indexLast + endStr.length);
    const toReplace = startStr + trimmedString;

    string = string.replace(toReplace, '');
  }
  return string;
};
