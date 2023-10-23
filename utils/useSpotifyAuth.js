import {
  ResponseType,
  useAuthRequest,
  makeRedirectUri,
} from "expo-auth-session";
import { AuthContext } from "./authContext";
import { useEffect, useContext } from "react";
import { Platform } from "react-native";

import * as WebBrowser from "expo-web-browser";

// TO DO: MOVE THESE TO ENV
const CLIENT_ID = "f7557db3ffb1415d9fce42bbca9cc634";
const REDIRECT_URI = "exp://10.65.65.237:8081";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "streaming",
  "user-read-email",
  "user-read-private",
];

// needed so that the browswer closes the modal after auth token
WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const useSpotifyAuth = () => {
  const { token, setToken } = useContext(AuthContext);
  const [_, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri:
        Platform.OS !== "web"
          ? REDIRECT_URI
          : makeRedirectUri({
              // scheme: null, // optional for web, mobile default: 'exp'
              preferLocalhost: true,
              isTripleSlashed: true,
              // useProxy: true, // not needed afaict, default: false
            }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
    if (Platform.OS === "web" && location.hash)
      setToken(location.hash.split("=")[1]);
  }, [response]);

  const setLoggedIn = () => {
    promptAsync(
      Platform.OS === "web"
        ? { windowName: "_self" }
        : /* this is for forcing the popup to be created within the same window so needs same context */
          {}
    );
  };
  // TO DO: pick better naming conventions
  return { token: token ?? undefined, getSpotifyAuth: setLoggedIn };
};

export default useSpotifyAuth;
