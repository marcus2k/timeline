export const filterLines = (searchText, lines) => {
  if (searchText === "") {
    return lines;
  }
  let clonedLines = [...lines];
  clonedLines = clonedLines.filter(line => line.name.toLowerCase().includes(searchText.toLowerCase()));
  return clonedLines;
}
