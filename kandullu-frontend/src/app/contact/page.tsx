"use client";
import React, { FC } from "react";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SocialsList from "@/shared/SocialsList";

import ButtonPrimary from "@/shared/ButtonPrimary";
import { Form, Input, Button, notification, Col, Row } from "antd";

import { useCreateContact } from "./queries";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { useForm } from "antd/es/form/Form";

export interface PageContactProps {}

const info = [
  {
    title: "🗺 ADDRESS",
    desc: "Luna Tica, Puerto Viejo, Limón Costa Rica",
  },
  {
    title: "💌 EMAIL",
    desc: "info@villaskandulu.com",
  },
  {
    title: "☎ PHONE",
    desc: "+506 6425 9581",
  },
];

const PageContact: FC<PageContactProps> = ({}) => {
  const { mutate: createContact, isPending } = useCreateContact();

  const [form] = useForm();
  const handleSubmit = (values: any) => {
    createContact(values, {
      onError: (error) => {
        displayErrorMessage(error);
      },
      onSuccess: () => {
        notification.success({ message: "Submitted Successfully" });
      },
    });
  };
  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Contact
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
            <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 SOCIALS
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
            <div>
              <Form
                form={form}
                name="contact-form"
                layout="vertical"
                onFinish={handleSubmit}
              >
                <Row gutter={[6, 6]}>
                  <Col span={24}>
                    <Form.Item
                      label="Name"
                      name="full_name"
                      rules={[
                        { required: true, message: "Full name is required" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Email is required" },
                        { type: "email", message: "Invalid email address" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Phone no."
                      name="phone_no"
                      rules={[
                        { required: true, message: "Phone number is required" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Message"
                      name="message"
                      rules={[
                        { required: true, message: "Message is required" },
                      ]}
                    >
                      <Input.TextArea />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <ButtonPrimary
                      type="submit"
                      loading={isPending}
                      className="w-full"
                    >
                      Send Message
                    </ButtonPrimary>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      <div className="container">
        <SectionSubscribe2 className="pb-24 lg:pb-32" />
      </div>
    </div>
  );
};

export default PageContact;
