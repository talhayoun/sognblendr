import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { updateDj } from "../../apis/dj";

export default function Settigns() {
  const [form] = Form.useForm();
  const djId = localStorage.getItem('djId');
  const navigate = useNavigate();


  const onFinish = async (values) => {
    if (!djId) return navigate("/")
    const response = await updateDj(djId, values);
    if (response.status == 200) {
      message.success("Updated DJ successfully");
    }
  };
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

        <Form.Item name="password" label="Password">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>
        <Form.Item name="website" label="Website">
          <Input />
        </Form.Item>
        <Form.Item name="facebook" label="Facebook">
          <Input />
        </Form.Item>
        <Form.Item name="location" label="Location">
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
          <Form.Item style={{ width: '100%' }}>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
}
