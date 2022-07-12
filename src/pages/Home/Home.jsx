import RedButton from "../../components/styled-components/StyledButtons/RedButton/RedButton";
import BlueButton from "../../components/styled-components/StyledButtons/BlueButton/BlueButton";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="Home"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Link to="/Join">
        <RedButton>I'M A DJ</RedButton>
      </Link>
      <Link to="/Party">
        <BlueButton>I WANT TO PARTY</BlueButton>
      </Link>
    </div>
  );
}
