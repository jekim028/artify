import axios from "axios";

const SPOTIFY_API = {
  USER_PLAYLISTS_GETTER: "https://api.spotify.com/v1/me/playlists",
};

const NETWORK_FAILURE = new Error(
  "Network failure.\nCheck console for more details.\nRandom cached data is returned."
);

const fetcher = async (url, token) => {
  try {
    return await axios(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSpotify = async (token, url) => {
  try {
    let res = await fetcher(url, token);
    return res.data?.items;
  } catch (e) {
    console.error(e);
    alert(NETWORK_FAILURE);
  }
};
