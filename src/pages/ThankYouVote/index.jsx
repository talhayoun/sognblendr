import { Typography } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;
export const ThankYouVote = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate(`/dj/${id}`)
        }, 3000);
    }, [])

    return (
        <div style={styles.container}>
            <Title level={3}>Thank you for your vote!</Title>
            <Title level={4}>We'll do our best to play your song!</Title>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'column',
        backgroundColor: "#f4ca16",
        height: '100vh',
        width: '100vw'
    }
}