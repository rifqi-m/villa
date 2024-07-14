"use client";
import ButtonPrimary from "@/shared/ButtonPrimary";

import { Form, Input, notification } from "antd";
import Link from "next/link";
import { useSignUp } from "./queries";
import { useRouter } from "next/navigation";
import { displayErrorMessage } from "@/utils/displayErrorMsg";

type signupType = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};

const PageSignUp = ({}) => {
  const [form] = Form.useForm();
  const { mutate: signUp, isPending } = useSignUp();
  const router = useRouter();

  const onFinish = (values: signupType) => {
    signUp(values, {
      onSuccess: (data) => {
        notification.success({ message: "Signed in successfully" });
        router.back();
      },
      onError: (error) => {
        displayErrorMessage(error);
      },
    });
  };
  return (
    <div className={`nc-PageSignUp  `}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="Email address"
              name="email"
              rules={[
                { required: true, message: "Please enter your email address" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input placeholder="example@example.com" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: false }]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item className="!w-full">
              <ButtonPrimary
                type="submit"
                loading={isPending}
                className="flex items-center justify-center !w-full"
              >
                Continue
              </ButtonPrimary>
            </Form.Item>
          </Form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link href={"/login" as any} className="font-semibold underline">
              Log in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
