import RedButton from "../../components/styled-components/StyledButtons/RedButton/RedButton";
import BlueButton from "../../components/styled-components/StyledButtons/BlueButton/BlueButton";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Link
        to="/Join"
        style={{
          position: "absolute",
          top: "2.5rem",
        }}
      >
        <button
          style={{
            width: "3.5rem",
            borderRadius: "50%",
            height: "3.5rem",
            background: "#a99595",
            color: "white",
            fontWeight: "bold",
          }}
        >
          DJ
        </button>
      </Link>
      <div
        className="Home"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Link to="/Party">
          <BlueButton>Request a Song</BlueButton>
        </Link>
      </div>
    </>
  );
}
