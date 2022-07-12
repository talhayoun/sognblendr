import React, { useEffect, useState } from "react";
import { Form, Select, Checkbox, Cascader, message } from "antd";
import GreenButton from "../../components/styled-components/StyledButtons/GreenButton/GreenButton";
import { getDjEventsList, getSongsByDjId } from "../../apis/dj";
import { useNavigate } from "react-router-dom";
import { CheckBoxSong } from "../../components/CheckBox/checkbox";
import { addSongToEvent } from "../../apis/events";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const EditEvents = () => {
  const [form] = Form.useForm();
  const [events, setEvents] = useState([]);
  const [songs, setSongs] = useState([]);
  const [chosenSongs, setChosenSongs] = useState([]);
  const [chosenEvent, setChosenEvent] = useState(null);
  const djId = localStorage.getItem("djId");

  const navigate = useNavigate();

  const onFinish = async () => {
    if (!chosenEvent || chosenSongs?.length == 0) return;
    for (let i = 0; i < chosenSongs.length; i++) {
      await addSongToEvent(chosenEvent, chosenSongs[i].id)
    }
    message.success('Added songs to event')
  };

  useEffect(() => {
    if (!djId) return navigate("/");

    const getEventsList = async () => {
      const response = await getDjEventsList(djId);
      if (response?.data?.data?.length > 0) {
        setEvents(
          response.data.data.map((currentEvent) => {
            return { value: currentEvent.id, label: currentEvent.name };
          })
        );
      }
    };

    getEventsList();

    const getDJSongs = async () => {
      const response = await getSongsByDjId(djId);
      if (response?.data?.data.length > 0) {
        const songsSorted = response.data.data.map((currentSong) => {
          return { value: currentSong.id, label: currentSong.name };
        });

        setSongs(songsSorted);
      }
    };

    getDJSongs();
  }, []);


  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: "050",
      }}
      scrollToFirstError
    >
      <Form.Item name="events" label="Event">
        <Cascader
          options={events}
          value={chosenEvent}
          onChange={(e) => setChosenEvent(e[0])}
        />
      </Form.Item>

      <Form.Item name="songList">
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {songs.map((data, index) => (
            <CheckBoxSong {...data} key={index} setAddToList={setChosenSongs} />
          ))}
        </div>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <GreenButton onClick={onFinish} htmlType="submit">Register</GreenButton>
      </Form.Item>
    </Form>
  );
};

export default () => <EditEvents />;
