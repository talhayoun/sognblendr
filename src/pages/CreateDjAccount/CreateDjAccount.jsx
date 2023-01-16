import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  AutoComplete,
  message,
} from "antd";
import GreenButton from "../../components/styled-components/StyledButtons/GreenButton/GreenButton";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { signupDj } from "../../apis/dj";
import { useNavigate } from "react-router-dom";

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

const CreateDjAccount = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await signupDj(values);
      message.success("Signed up successfully");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      message.error(error?.response?.data?.err ?? "Something went wrong");
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="050">050</Option>
        <Option value="051">051</Option>
        <Option value="052">052</Option>
        <Option value="053">053</Option>
        <Option value="054">054</Option>
        <Option value="055">055</Option>
        <Option value="056">056</Option>
        <Option value="058">058</Option>
        <Option value="059">059</Option>
      </Select>
    </Form.Item>
  );

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
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: "050",
      }}
      scrollToFirstError
    >
      <Form.Item name="firstName" label="First Name">
        <Input style={{ borderRadius: "20px" }} prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item name="lastName" label="Last Name">
        <Input style={{ borderRadius: "20px" }} prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input style={{ borderRadius: "20px" }} prefix={<MailOutlined />} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password style={{ borderRadius: "20px" }} />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password style={{ borderRadius: "20px" }} />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          prefix={<PhoneOutlined />}
          style={{ borderRadius: "20px", width: "100%" }}
          addonBefore={prefixSelector}
        />
      </Form.Item>

      <Form.Item name="website" label="Website">
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange}>
          <Input style={{ borderRadius: "20px" }} />
        </AutoComplete>
      </Form.Item>

      <Form.Item name="intro" label="Intro">
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          Confirm website <a href="">terms & policy</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <GreenButton htmlType="submit">Register</GreenButton>
      </Form.Item>
    </Form>
  );
};

export default () => <CreateDjAccount />;
