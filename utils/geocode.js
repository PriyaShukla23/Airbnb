const axios = require("axios");

module.exports = async function geocodeAddress(address) {
  const res = await axios.get("https://nominatim.openstreetmap.org/search", {
    params: {
      q: address,
      format: "json",
      limit: 1,
    },
    headers: {
      "User-Agent": "wanderlust-majorProject", // required by Nominatim
    },
  });

  if (!res.data.length) {
    throw new Error("Location not found. Try a more specific address.");
  }

  const { lat, lon } = res.data[0];
  return { lat: parseFloat(lat), lng: parseFloat(lon) };
};