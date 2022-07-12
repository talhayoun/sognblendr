import { Typography } from "antd";
import moment from "moment";
import { PlaySquareOutlined, HeartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { rankEventSong } from "../../apis/events";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

export const SongPreview = (props) => {
    const [heartClicked, setHeartClicked] = useState(false);

    const params = useParams();
    const { eventId } = params;
    const navigate = useNavigate();


    const onClickHeartHandler = async () => {
        const votes = localStorage.getItem("votes");
        if (votes >= 2) return;

        localStorage.setItem("votes", +votes + 1);

        await rankEventSong(eventId, 1);

        setHeartClicked((prevState) => !prevState);

        if (votes + 1 >= 2) {
            localStorage.setItem("expiration", moment(new Date()).add(1, "h"));
            navigate(`/thankyou/${props?.eventData?.id_dj}`);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.playContainer}>
                <PlaySquareOutlined style={{ fontSize: "30px" }} />
            </div>
            <div style={styles.contentContainer}>
                <div>
                    <Title level={4}>{props.name}</Title>
                    <Typography>{props.artist}</Typography>
                </div>
                {localStorage.getItem("votes") < 2 && (
                    <HeartOutlined
                        onClick={onClickHeartHandler}
                        style={{
                            ...styles.heartStyle,
                            color: heartClicked ? "red" : "black",
                        }}
                    />
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: "100%",
        display: "flex",
        gap: "30px",
        background: "#FFF",
        padding: "10px",
        borderBottom: "2px solid #eee",
        position: "relative",
    },
    playContainer: {
        padding: "20px",
    },
    contentContainer: {
        display: "flex",
    },
    heartStyle: {
        fontSize: "30px",
        cursor: "pointer",
        position: "absolute",
        right: "10px",
        bottom: "10px",
    },
};
