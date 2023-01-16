import { Link } from "react-router-dom";
import RedButton from "../../components/styled-components/StyledButtons/RedButton/RedButton";
import BlueButton from "../../components/styled-components/StyledButtons/BlueButton/BlueButton";

export default function Join() {
  return (
    <div
      className="Join"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Link to="/CreateDJAccount">
        <BlueButton>CREATE ACCOUNT</BlueButton>
      </Link>
      <Link to="/LogIn">
        <RedButton>LOGIN</RedButton>
      </Link>
    </div>
  );
}
