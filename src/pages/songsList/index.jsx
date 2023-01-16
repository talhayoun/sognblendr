import { Grid, message } from "antd";
import { Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getPlaylistById,
} from "../../apis/events";
import { SongPreview } from "../../components/songPreview";

const { Title } = Typography;

const { useBreakpoint } = Grid;
export default function SongsList() {
    const [songs, setSongs] = useState([]);
    const [duration, setDuration] = useState("");
    const isMobile = useBreakpoint().xs;
    const params = useParams();
    const navigate = useNavigate();
    const { eventId } = params;

    const styles = {
        container: {
            minWidth: "300px",
            width: isMobile ? "100%" : "350px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
        },
        header: {
            minWidth: "300px",
            width: "100%",
            height: "4rem",
            background: "#f4ca16",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        songsContainer: {
            width: "100%",
        },
    };

    const getPlaylist = async () => {
        try {
            const response = await getPlaylistById(eventId);
            setSongs(response.data.songs);
        } catch (error) {
            switch (error?.response?.status) {
                case 403:
                    message.error("Event hasn't started yet");
                    navigate("/")
                    break;
                case 401:
                    message.error("Event does not exist");
                    navigate("/")
                    break;
                default:
                    message.error("Failed to find playlist");
                    break;
            }
        }
    };


    useEffect(() => {
        getPlaylist();
    }, []);

    useEffect(() => {
        let expirationTime = localStorage.getItem("expiration");
        if (
            !expirationTime ||
            expirationTime == "null" ||
            expirationTime == "undefined"
        ) {
            return;
        }

        expirationTime = new Date(expirationTime);

        const nowDate = new Date();

        let timePassed = moment(expirationTime).isBefore(nowDate);

        if (timePassed) {
            localStorage.setItem("votes", 0);
            return localStorage.setItem("expiration", null);
        }

        const diffTime = expirationTime - nowDate;
        let duration = moment.duration(diffTime, "milliseconds");
        let interval = setInterval(() => {
            duration = moment.duration(duration - 1000, "milliseconds");
            setDuration(duration);
        }, 1000);

        // setTimeout(() => {
        //     navigate(`/dj/${eventId}`);
        // }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div style={styles.container}>
            {duration && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        marginBottom: "10px",
                    }}
                >
                    <Title level={5} style={{ margin: 0 }}>
                        Time left to revote:{" "}
                    </Title>
                    <p style={{ margin: 0 }}>{`${duration.minutes()}:   ${duration.seconds() < 10
                        ? `0${duration.seconds()}`
                        : duration.seconds()
                        }`}</p>
                </div>
            )}
            <div style={styles.header}>
                <Title level={3} style={{ color: "#fff" }}>
                    Please choose one song
                </Title>
            </div>
            <div style={styles.songsContainer}>
                {songs?.map((currentSong, index) => (
                    <SongPreview eventId={eventId} key={index} song={currentSong} />
                ))}
            </div>
        </div>
    );
}
