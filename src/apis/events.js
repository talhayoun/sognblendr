import { DjApiEndpoints } from "./config/dj-endpoints";
import { EventsApiEndpoints } from "./config/events-endpoints";
import { axiosInstace, IS_PRIVATE } from "./index";

export const fetchEventSongs = (id) => {
    return axiosInstace.get(`music/read.php?event=${id}`);
};

export const rankEventSong = (id, rating) => {
    return axiosInstace.post(`music/rank.php`, { id, rating });
};

export const fetchEventById = (id) => {
    return axiosInstace.get(`event/read_single.php`, { params: { id } });
};

export const fetchEventSongsById = async (eventId) => {
    return axiosInstace.get(`music/read.php`, { params: { event: eventId } });
};

export const addSongToEvent = async (eventId, songId) => {
    return axiosInstace.post("/music/create.php", {
        id_event: eventId,
        id_song: songId,
    });
};

export const createEvent = async (payload) => {
    return axiosInstace.post(EventsApiEndpoints.BASE_URL, payload);
};

export const addSongToMainPlaylist = async (djId, data) => {
    return axiosInstace.post("/song/create.php", {
        id_dj: djId,
        name: data.songName,
        genere: data.genere,
        artist: data.artist,
        url: data.website,
    });
};

export const getPlaylistById = async (eventId) => {
    return axiosInstace.get(
        `${EventsApiEndpoints.BASE_URL}${EventsApiEndpoints.USER}/${eventId}`
    );
};
