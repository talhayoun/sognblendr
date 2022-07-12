import styled from "styled-components";
import { Button } from "antd";
import "antd/dist/antd.css";

const GreenButton = styled(Button)`
  background-color: lightgreen;
  font-weight: 500;
  :focus {
    background-color: lightgreen;
    border-color: lightgreen;
  }
  :hover {
    border-color: lightgreen;
  }
  &.ant-btn-clicked:after {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    bottom: -1px;
    right: -1px;
    border-radius: inherit;
    border: 0 solid lightgreen;
    opacity: 0.4;
    -webkit-animation: buttonEffect 0.4s;
    animation: buttonEffect 0.4s;
    display: block;
  }
`;

export default GreenButton;
