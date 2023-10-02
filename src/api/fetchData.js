export const exercisesOptions = {
  method: "GET",
  // doesn't work, added in url parameter
  //params: { limit: "1300" },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const fetchData = async (url, options) => {
  console.log("fetching");
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
