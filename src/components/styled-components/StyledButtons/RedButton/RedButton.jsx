import styled from "styled-components";
import { Button } from "antd";
import "antd/dist/antd.css";

const RedButton = styled(Button)`
  height: 100px;
  width: 200px;
  margin: 10px;
  color: palevioletred;
  font-size: 20px;
  font-weight: 500;
  border-radius: 20px;
  :focus {
    color: palevioletred;
    border-color: palevioletred;
  }
  :hover {
    color: palevioletred;
    border-color: palevioletred;
  }
  &.ant-btn-clicked:after {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    bottom: -1px;
    right: -1px;
    border-radius: inherit;
    border: 0 solid palevioletred;
    opacity: 0.4;
    -webkit-animation: buttonEffect 0.4s;
    animation: buttonEffect 0.4s;
    display: block;
  }
`;

export default RedButton;
