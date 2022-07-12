import { Form, Input, Checkbox, Button } from "antd";
import { loginDj } from "../../apis/dj";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LogIn() {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const onFormSubmit = async (values) => {
    const { username, password } = values;

    if (username?.length == 0 || password?.length == 0) return;

    const response = await loginDj(username, password);

    if (response?.data?.status == 0) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    } else {
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("djId", response?.data?.id);
      navigate("/eventslist");
    }
  };

  return (
    <div className="LogIn">
      <Form
        onFinish={onFormSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: false,
        }}
        autoComplete="on"
      >
        <Form.Item
          label="Dj ID"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            style={{ borderRadius: "20px", height: "40px" }}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            style={{ borderRadius: "20px", height: "40px" }}
          />
        </Form.Item>
        {isError && (
          <span style={{ color: "red", textAlign: 'center' }}>
            ID or password are invalid, try again
          </span>
        )}
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item style={{ margin: "0 auto" }}>
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
