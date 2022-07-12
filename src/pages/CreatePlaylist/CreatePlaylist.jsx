import React, { useState } from "react";
import { Form, Input, AutoComplete, message } from "antd";
import GreenButton from "../../components/styled-components/StyledButtons/GreenButton/GreenButton";
import { addSongToMainPlaylist } from "../../apis/events";
import { useNavigate } from "react-router-dom";

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

const CreatePlaylist = () => {
  const [form] = Form.useForm();
  const djId = localStorage.getItem("djId");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (!djId) return navigate("/");

    const response = await addSongToMainPlaylist(djId, values);
    if (response?.data && response.status === 200) {
      message.success("Added song to main playlist");
    }
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="add songs"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item name="songName" label="Name">
        <AutoComplete placeholder="Songs Name">
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item name="genre" label="Genre">
        <AutoComplete placeholder="Rock, Country, Etc...">
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item name="artist" label="Artist">
        <AutoComplete placeholder="Artists name">
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item name="website" label="Website">
        <AutoComplete
          options={websiteOptions}
          onChange={onWebsiteChange}
          placeholder="www.example.com"
        >
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <GreenButton htmlType="submit">Add Song</GreenButton>
      </Form.Item>
    </Form>
  );
};

export default () => <CreatePlaylist />;
