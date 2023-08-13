export const timeQuery = (published) => {
  const timestamp = Date.now();
  const publishedTimestamp = new Date(published).getTime();
  return Math.abs(timestamp - publishedTimestamp) / (60 * 60 * 1000 * 24);
};
