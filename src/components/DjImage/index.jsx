import { Typography } from "antd";
import { LinkOutlined } from "@ant-design/icons";
const { Title } = Typography;
export const DjImage = (props) => {
    return (
        <div style={styles.container}>
            <div style={styles.imageContainer}>
                <div style={styles.overImage}>
                    <Title
                        level={4}
                        style={{ textShadow: " 0 2px 3px rgba(0, 0, 0, 0.3)" }}
                    >
                        {props.name}
                    </Title>
                </div>
                <img
                    style={styles.img}
                    src="https://img.freepik.com/free-photo/blurred-background-many-people-had-fun-beach-party_96943-14.jpg?w=2000"
                />
            </div>
            <div style={styles.links}>
                <div style={styles.linksContainer}>
                    <div style={styles.linkChildren}>
                        <LinkOutlined />
                        <span>{props.website}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: "100%",
    },
    imageContainer: {
        position: "relative",
        backgroundImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent)",
    },
    img: {
        width: "100%",
        opacity: "0.4",
    },
    overImage: {
        position: "absolute",
        top: "10px",
        left: "10px",
        backgroundColor: "black 0.5",
    },
    links: {
        display: "flex",
        flexDirection: "column",
    },
    linksContainer: {
        display: "flex",
        gap: "20px",
    },
    linkChildren: {
        display: "flex",
        gap: "5px",
        alignItems: "center",
    },
    toggleContainer: {
        display: "flex",
        justifyContent: "space-between",
    },
};
