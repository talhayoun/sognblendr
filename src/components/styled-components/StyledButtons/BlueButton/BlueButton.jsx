import styled from "styled-components";
import { Button } from "antd";
import "antd/dist/antd.css";

const BlueButton = styled(Button)`
  height: 100px;
  width: 200px;
  margin: 10px;
  color: lightskyblue;
  font-size: 20px;
  font-weight: 500;
  border-radius: 20px;
  :focus {
    color: lightskyblue;
    border-color: lightskyblue;
  }
  :hover {
    color: lightskyblue;
    border-color: lightskyblue;
  }
  &.ant-btn-clicked:after {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    bottom: -1px;
    right: -1px;
    border-radius: inherit;
    border: 0 solid lightskyblue;
    opacity: 0.4;
    -webkit-animation: buttonEffect 0.4s;
    animation: buttonEffect 0.4s;
    display: block;
  }
`;

export default BlueButton;
