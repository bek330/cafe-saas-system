export const useTable = () => {
  const params = new URLSearchParams(window.location.search);
  const table = params.get("table");

  return table ? Number(table) : null;
};