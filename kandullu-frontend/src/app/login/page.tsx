"use client";
import { FC, useEffect } from "react";

import ButtonPrimary from "@/shared/ButtonPrimary";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "./queries";

export interface PageLoginProps {}

const PageLogin: FC<PageLoginProps> = ({}) => {
  const router = useRouter();
  const { mutate, isError, isPending } = useLogin();

  const onFinish = (values: { email: string; password: string }) =>
    mutate(values);

  const AUTH =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("auth") as string)
      : null;

  useEffect(() => {
    if (AUTH?.token) {
      router.back();
    }
  }, [AUTH, router]);

  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <Form
            onFinish={onFinish}
            initialValues={{ remember: true }}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Email"
                prefix={<MailOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Password"
                prefix={<LockOutlined />}
              />
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
            New user? {` `}
            <Link href={"/signup" as any} className="font-semibold underline">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
