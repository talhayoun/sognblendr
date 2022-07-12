import { Grid, Typography } from "antd";
import {
    SketchOutlined,
    PhoneOutlined,
    MailOutlined,
    FacebookOutlined,
    LinkOutlined,
} from "@ant-design/icons";
import { DjImage } from "../../components/DjImage";
import { TitleDescription } from "../../components/TitleDescription";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDjById } from "../../apis/dj";

const { Title } = Typography;
const { useBreakpoint } = Grid;
export const DjInfo = () => {
    const [djData, setDjData] = useState(null);

    const { djId } = useParams();
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

    useEffect(() => {
        const getDjInfo = async () => {
            const response = await getDjById(djId);
            if (response?.data) {
                setDjData(response.data);
            }
        };
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
                    name={`${djData?.first_name} ${djData?.last_name}`}
                    location={djData?.location}
                    website={djData?.website}
                />
                <div style={styles.descriptionsDiv}>
                    <TitleDescription
                        title={"About us"}
                        description={djData?.about}
                        direction={"rtl"}
                    />
                    <TitleDescription
                        title={"Location"}
                        description={djData?.location}
                        Icon={SketchOutlined}
                    />
                    <TitleDescription
                        title={"Phone"}
                        description={djData?.phone}
                        Icon={PhoneOutlined}
                    />
                    <TitleDescription
                        title={"Email"}
                        description={djData?.email}
                        Icon={MailOutlined}
                    />
                    <TitleDescription
                        title={"Social"}
                        description={djData?.facebook}
                        Icon={FacebookOutlined}
                    />
                    <TitleDescription
                        title={"Website"}
                        description={djData?.website}
                        Icon={LinkOutlined}
                    />
                </div>
            </div>
        </div>
    );
};
