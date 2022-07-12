import { Button, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Party() {
    const [displayInput, setDisplayInput] = useState(false);
    const [pincode, setPincode] = useState("");

    const navigate = useNavigate();

    const onSendHandler = () => {
        navigate(`/songslist/${pincode}`);
    };

    return (
        <div style={styles.container}>
            <div style={styles.contentContainer}>
                <Button
                    onClick={() => setDisplayInput(true)}
                    type="primary"
                    size="large"
                >
                    Enter Pin
                </Button>
                {displayInput && (
                    <>
                        <Input
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="Pincode..."
                            style={{ width: "40%" }}
                        />
                        <Button onClick={onSendHandler}>Send</Button>
                    </>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        width: "100vw",
        background: "#f4ca16",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    contentContainer: {
        height: "50vh",
        width: "50vh",
        borderRadius: "50%",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
    },
};
