import { axiosInstace } from "."
import { EventsApiEndpoints } from "./config/events-endpoints";
import { UserApiEndpoints } from "./config/user-endpoints"

export const loginEvent = (pincode) => {
    return axiosInstace.get(`${UserApiEndpoints.BASE_URL}/${pincode}`);
}

export const userVote = (eventId, songId) => {
    return axiosInstace.patch(`${EventsApiEndpoints.BASE_URL}/${EventsApiEndpoints.SONG}/${eventId}`, { songId });
}