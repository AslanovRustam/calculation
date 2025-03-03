export const fetchSuggestions = async () => {
  const res = await fetch(
    "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
  );
  if (!res.ok) throw new Error("Failed to fetch suggestions");
  return res.json();
};
