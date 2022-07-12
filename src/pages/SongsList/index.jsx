import { Grid } from "antd";
import { Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById, fetchEventSongs } from "../../apis/events";
import { SongPreview } from "../../components/SongPreview";

const { Title } = Typography;

const { useBreakpoint } = Grid;
export default function SongsList() {
    const [songs, setSongs] = useState([]);
    const [duration, setDuration] = useState("");
    const [eventData, setEventData] = useState(null);
    const isMobile = useBreakpoint().xs;
    const params = useParams();
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

    useEffect(() => {
        const getSongsList = async () => {
            const response = await fetchEventSongs(eventId);
            if (response?.data?.data?.length > 0) {
                setSongs(response.data.data);
            }
        };
        getSongsList();

        const getEventData = async () => {
            const response = await fetchEventById(eventId);
            if (response?.data?.data.length > 0) {
                const djData = response.data.data[0];

                setEventData(djData);
            }
        };
        getEventData();
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
                {songs.map((currentSong, index) => (
                    <SongPreview
                        eventData={eventData}
                        key={index}
                        name={currentSong.song_name}
                        artist={currentSong.artist_name}
                    />
                ))}
            </div>
        </div>
    );
}
