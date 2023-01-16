import styled from 'styled-components';
import {Checkbox} from 'antd';
import 'antd/dist/antd.css';

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-input:focus + .ant-checkbox-inner,
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: palevioletred;
  }
  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: palevioletred;
    border-color: palevioletred;
  }
  .ant-checkbox-checked:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    border: 1px solid palevioletred;
    content: '';
    -webkit-animation: antCheckboxEffect 0.36s ease-in-out;
    animation: antCheckboxEffect 0.36s ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    visibility: hidden;
  }
`;

export default StyledCheckbox;