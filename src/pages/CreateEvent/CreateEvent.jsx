import React, { useState } from "react";
import { Form, Input, TimePicker, DatePicker, message } from "antd";
import GreenButton from "../../components/styled-components/StyledButtons/GreenButton/GreenButton";
import { createSong } from "../../apis/dj";
import { useNavigate } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 11,
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

const CreateEvent = () => {
  const [form] = Form.useForm();
  const djId = localStorage.getItem("djId");
  const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    if (!djId) {
      return navigate("/");
    }
    const response = await createSong(djId, values)
    if (response?.data?.message && response.status == 200) {
      message.success("Event is created successfully")
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
      name="create event"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item name="EventName" label="Events Name">
        <Input style={{ borderRadius: '20px', width: '100%' }} />
      </Form.Item>

      <Form.Item name="partyCode" label="Party Code">
        <Input style={{ borderRadius: '20px', width: '100%' }} />
      </Form.Item>

      <Form.Item name="numOfParticipants" label="Number of Participants">
        <Input style={{ borderRadius: '20px', width: '100%' }} />
      </Form.Item>

      <Form.Item name="eventDate" label="Events Date">
        <DatePicker style={{ borderRadius: '20px', width: '100%' }} />
      </Form.Item>

      <Form.Item name="eventsStartTime" label="Start time">
        <TimePicker style={{ borderRadius: '20px', width: '100%' }} />
      </Form.Item>

      <Form.Item name="eventsEndTime" label="End Time">
        <TimePicker style={{ borderRadius: '20px', width: '100%' }} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <GreenButton htmlType="submit">Generate Code</GreenButton>
      </Form.Item>
    </Form>
  );
};

export default () => <CreateEvent />;
