import { Typography, Grid } from "antd";
import { useEffect, useState } from "react";
import { fetchDjsList } from "../../apis/dj";
import { DjImage } from "../../components/DjImage";

const { useBreakpoint } = Grid;
const { Title } = Typography;
export const DjListing = () => {
    const [djList, setDjList] = useState([]);

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
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxHeight: "700px",
            overflowY: isMobile ? "none" : "scroll",
        },
    };

    useEffect(() => {
        const getDjsList = async () => {
            const response = await fetchDjsList();
            if (response?.data?.data?.length > 0) {
                setDjList(response.data.data);
            }
        };

        getDjsList();
    }, []);
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Title level={4}> DJ Listing</Title>
            </div>
            <div style={styles.content}>
                {djList.map((currentDj) => (
                    <DjImage
                        key={currentDj.id}
                        src="https://img.freepik.com/free-photo/blurred-background-many-people-had-fun-beach-party_96943-14.jpg?w=2000"
                        name={`${currentDj.first_name} ${currentDj.last_name}`}
                        location={currentDj.location}
                        website={currentDj.website}
                    />
                ))}
            </div>
        </div>
    );
};
