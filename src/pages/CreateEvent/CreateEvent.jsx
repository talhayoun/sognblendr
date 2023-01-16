import React from "react";
import { Form, Input, TimePicker, DatePicker, message } from "antd";
import GreenButton from "../../components/styled-components/StyledButtons/GreenButton/GreenButton";
import { createEvent } from "../../apis/events";
import { Navigate, useNavigate } from "react-router-dom";

//TODO
// Add to protected route

const CreateEvent = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    let { name, partyCode, participants, date, starttime, votes, minimumSongs } = values;

    const year = date.year();
    const month = date.month();
    const day = date.date();
    const hour = starttime.hours();
    const minutes = starttime.minutes();

    const fixedDate = new Date(year, month, day, hour, minutes);

    if (!name || !partyCode || !participants || !date) {
      return message.error("All fields are required");
    }
    try {
      await createEvent({
        name,
        partyCode,
        participants,
        votes,
        minimumSongs,
        date: fixedDate,
      });

      message.success("Event is created successfully");
      navigate('/eventslist')
    } catch (error) {
      switch (error?.response?.status) {
        case 401:
          message.error('Party code is already taken, try different one');
          break;
        default:
          message.error("Failed to create event");
          break;
      }

    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="create event"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item name="name" label="Events Name">
        <Input style={{ borderRadius: "20px", width: "100%" }} />
      </Form.Item>

      <Form.Item name="partyCode" label="Party Code">
        <Input style={{ borderRadius: "20px", width: "100%" }} />
      </Form.Item>

      <Form.Item name="participants" label="Number of Participants">
        <Input style={{ borderRadius: "20px", width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="votes"
        label="Minimum votes"
        tooltip="Minimum votes for a song to be added to queue"
      >
        <Input style={{ borderRadius: "20px", width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="minimumSongs"
        label="Playlist Songs"
        tooltip="How many songs should be displayed for users to vote - default is 20"
      >
        <Input style={{ borderRadius: "20px", width: "100%" }} />
      </Form.Item>

      <Form.Item name="date" label="Events Date">
        <DatePicker style={{ borderRadius: "20px", width: "100%" }} />
      </Form.Item>

      <Form.Item name="starttime" label="Start time">
        <TimePicker style={{ borderRadius: "20px", width: "100%" }} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GreenButton htmlType="submit">Create Event</GreenButton>
        </div>
      </Form.Item>
    </Form>
  );
};
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

export default () => <CreateEvent />;
