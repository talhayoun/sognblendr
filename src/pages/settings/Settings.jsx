import { Button, Form, Input, message } from "antd";
import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDjById, updateDj } from "../../apis/dj";
import { spotifyConnect, spotifyConnectAuth } from "../../apis/spotify";
import { Spotify } from "../../assets/svgs/spotify";

export default function Settigns() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = async (values) => {
    const response = await updateDj(values);
    if (response.status == 200) {
      message.success("Updated DJ successfully");
    }
  };

  const onSpotifyConnectHandler = async () => {
    try {
      const response = await spotifyConnect();
      window.location.href = response?.data;
    } catch (error) {
      message.error(error?.response?.data?.err ?? "Something went wrong");
    }
  };

  const spotifyAuth = async (code) => {
    try {
      await spotifyConnectAuth(code);
      message.success("Connected successfuly to Spotify");
    } catch (error) {
      message.error("Failed to connect to Spotify");
    }
  };

  const getDjHandler = async () => {
    try {
      const response = await getDjById();
      form.setFieldsValue({
        ...response?.data?.data,
        about: response?.data?.data?.intro,
        phone: response?.data?.data?.phoneNumber,
      });
    } catch (error) {
      message.error(error?.response?.data?.err ?? "Something went wrong");
    }
  };
  useEffect(() => {
    getDjHandler();
  }, []);

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    if (code) spotifyAuth(code);
  }, [location]);

  return (
    <Form form={form} name="add songs" onFinish={onFinish} scrollToFirstError>
      <div className="settings-container">
        <Form.Item name="firstName" label="firstName">
          <Input />
        </Form.Item>

        <Form.Item name="lastName" label="lastName">
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>
        <Form.Item name="website" label="Website">
          <Input />
        </Form.Item>
        <Form.Item name="about" label="About">
          <Input />
        </Form.Item>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Form.Item style={{ width: "100%" }}>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </div>
        <div title={"Connect"} onClick={onSpotifyConnectHandler}>
          <Spotify />
        </div>
      </div>
    </Form>
  );
}
