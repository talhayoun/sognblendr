import { axiosInstace } from "."
import { SpotifyApiEndpoints } from "./config/spotify-endpoints"

export const spotifyConnect = async () => {
    return await axiosInstace.get(`${SpotifyApiEndpoints.BASE_URL}${SpotifyApiEndpoints.LOGIN}`);
};

export const spotifyConnectAuth = async (code) => {
    return await axiosInstace(`${SpotifyApiEndpoints.BASE_URL}${SpotifyApiEndpoints.AUTH}`, { params: { code } });
}
