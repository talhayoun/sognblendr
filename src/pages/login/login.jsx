import { Form, Input, Checkbox, Button, message } from "antd";
import { loginDj } from "../../apis/dj";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const onFormSubmit = async (values) => {
    const { email, password } = values;

    if (email?.length === 0 || password?.length === 0) return;
    try {
      const response = await loginDj(email, password);
      localStorage.setItem("token", response?.data?.token);
      navigate("/eventslist");

    } catch (error) {
      message.error(error?.response?.data ?? 'Something went wrong');
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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            style={{ borderRadius: "20px", height: "40px" }}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
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
