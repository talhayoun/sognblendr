import { Checkbox } from "antd";
import { useState } from "react";

export const CheckBoxSong = (props) => {
    const [checked, setChecked] = useState(false);
    const { label, setAddToList } = props;
    const onClickCheckbox = () => {
        if (!checked) {
            setAddToList((prevState) => {
                let cloneState = [...prevState];
                cloneState.push({ id: props.value });
                return cloneState;
            });
        } else {
            setAddToList((prevState) => {
                let cloneState = [...prevState];
                return cloneState.filter((currentSong) => currentSong.id !== props.value);
            });
        }
        setChecked((prevState) => !prevState);
    };
    return (
        <Checkbox
            style={{ marginLeft: "8px" }}
            checked={checked}
            onChange={onClickCheckbox}
        >
            <span style={{ fontWeight: "bold" }}>{label}</span>
        </Checkbox>
    );
};
