import { axiosInstace } from "./index";

export const fetchDjsList = () => {
    return axiosInstace.get("dj/read.php");
};

export const loginDj = (id, password) => {
    return axiosInstace.post("auth/login.php", { id, password });
};

export const getDjEventsList = (id) => {
    return axiosInstace.get(`event/read.php`, { params: { dj: id } });
};

export const getDjById = (id) => {
    return axiosInstace.get(`dj/read_single.php`, { params: { id } });
};

export const createDjAccount = (data) => {
    return axiosInstace.post("dj/create.php", { ...data });
};

export const createSong = (djId, data) => {
    return axiosInstace.post("/song/create.php", { id_dj: djId, ...data });
};

export const getSongsByDjId = (djId) => {
    return axiosInstace.get("/song/read.php", { params: { dj: djId } });
};



export const updateDj = (djId, data) => {
    return axiosInstace.post("/dj/update.php", {
        id: djId,
        first_name: data.firstName,
        last_name: data.lastName,
        facebook: data.facebook,
        website: data.website,
        location: data.location,
        phone: data.phone,
        password: data.password,
        email: data.email,
        about: data.about
    })
}