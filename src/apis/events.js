import { axiosInstace } from "./index";

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

export const createEvent = async (djId, data) => {
    return axiosInstace.post("/event/create.php", {
        id_dj: djId,
        code: data.partyCode,
        name: data.EventName,
        participants: data.numOfParticipants,
        event_date: data.eventDate,
        event_start: data.eventsStartTime,
        event_end: data.eventsStartTime,
    });
};


export const addSongToMainPlaylist = async (djId, data) => {
    return axiosInstace.post("/song/create.php", {
        id_dj: djId,
        name: data.songName,
        genere: data.genere,
        artist: data.artist,
        url: data.website
    })
}