import axios from "axios";

const SPOTIFY_API = {
  USER_PLAYLISTS_GETTER: "https://api.spotify.com/v1/me/playlists",
};

const NETWORK_FAILURE = new Error(
  "Network failure.\nCheck console for more details.\nRandom cached data is returned."
);
