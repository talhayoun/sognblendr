import { Grid, message, Typography } from "antd";
import { PhoneOutlined, MailOutlined, LinkOutlined } from "@ant-design/icons";
import { DjImage } from "../../components/DjImage";
import { TitleDescription } from "../../components/TitleDescription";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDjByEventId } from "../../apis/dj";

const { Title } = Typography;
const { useBreakpoint } = Grid;
export const DjInfo = () => {
    const [dj, setDjData] = useState(null);

    const { eventId } = useParams();
    const isMobile = useBreakpoint().xs;

    const styles = {
        container: {
            display: isMobile ? "block" : "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: isMobile ? "100%" : "unset",
            width: isMobile ? "100%" : "350px",
            background: "#fff",
        },
        header: {
            width: "100%",
            height: "4rem",
            backgroundColor: "#f4ca16",
            padding: "20px",
        },
        content: {
            height: "100%",
            padding: "10px",
        },
        descriptionsDiv: {
            marginTop: "30px",
        },
    };

    const getDjInfo = async () => {
        try {
            const response = await getDjByEventId(eventId);
            setDjData(response.data?.dj);
        } catch (error) {
            message.error("Failed to get DJ");
        }
    };
    useEffect(() => {
        getDjInfo();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Title level={4}> DJ Info</Title>
            </div>
            <div style={styles.content}>
                <DjImage
                    src="https://img.freepik.com/free-photo/blurred-background-many-people-had-fun-beach-party_96943-14.jpg?w=2000"
                    name={`${dj?.name} ${dj?.lastName}`}
                    website={dj?.website}
                />
                <div style={styles.descriptionsDiv}>
                    <TitleDescription
                        title={"About us"}
                        description={dj?.intro ?? "-"}
                        direction={"rtl"}
                    />
                    <TitleDescription
                        title={"Phone"}
                        description={dj?.phoneNumber ?? "-"}
                        Icon={PhoneOutlined}
                    />
                    <TitleDescription
                        title={"Email"}
                        description={dj?.email ?? "-"}
                        Icon={MailOutlined}
                    />
                    <TitleDescription
                        title={"Website"}
                        description={dj?.website ?? "-"}
                        Icon={LinkOutlined}
                    />
                </div>
            </div>
        </div>
    );
};
