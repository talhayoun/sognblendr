import { DjApiEndpoints } from "./config/dj-endpoints";
import { EventsApiEndpoints } from "./config/events-endpoints";
import { SpotifyApiEndpoints } from "./config/spotify-endpoints";
import { axiosInstace } from "./index";

export const fetchDjsList = () => {
    return axiosInstace.get("dj/read.php");
};

export const loginDj = (email, password) => {
    return axiosInstace.post(
        `${DjApiEndpoints.BASE_URL}${DjApiEndpoints.LOGIN}`,
        { email, password }
    );
};

export const signupDj = (data) => {
    return axiosInstace.post(
        `${DjApiEndpoints.BASE_URL}${DjApiEndpoints.SIGNUP}`,
        { ...data }
    );
};

export const getDjEventsList = () => {
    return axiosInstace.get(`${DjApiEndpoints.BASE_URL}${DjApiEndpoints.EVENTS}`);
};

export const getDjById = () => {
    return axiosInstace.get(`${DjApiEndpoints.BASE_URL}`);
};

export const createSong = (djId, data) => {
    return axiosInstace.post("/song/create.php", { id_dj: djId, ...data });
};

export const getSongsByDjId = (djId) => {
    return axiosInstace.get("/song/read.php", { params: { dj: djId } });
};

export const updateDj = (data) => {
    return axiosInstace.patch(`${DjApiEndpoints.BASE_URL}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        website: data.website,
        phoneNumber: data.phone,
        email: data.email,
        intro: data.about,
    });
};

export const findDjEventById = (eventId) => {
    return axiosInstace.get(
        `${DjApiEndpoints.BASE_URL}${DjApiEndpoints.EVENT}/${eventId}`
    );
};

export const findDjPlaylists = async () => {
    return axiosInstace.get(
        `${SpotifyApiEndpoints.BASE_URL}${SpotifyApiEndpoints.PLAYLISTS}`
    );
};

export const savePlaylistToEvent = async (eventId, playlistId, values) => {
    return axiosInstace.patch(`${EventsApiEndpoints.BASE_URL}/${eventId}`, {
        playlistId,
        ...values,
        partyCode: values?.party_code
    });
};

export const getDjByEventId = async (eventId) => {
    return axiosInstace.get(`${DjApiEndpoints.BASE_URL}/${eventId}`);
};
