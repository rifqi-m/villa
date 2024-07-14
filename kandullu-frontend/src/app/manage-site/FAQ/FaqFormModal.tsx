"use client";
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { useCreateFaq, useUpdateFaq } from "./queries"; // Use your query hook
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { queryClient } from "@/configs/queryClient";
import { isEmpty } from "lodash";

type FaqFormModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  initialData?: { id?: string; question?: string; answer?: string };
};

const FaqFormModal: React.FC<FaqFormModalProps> = ({
  visible,
  onClose,
  onSubmitSuccess,
  initialData,
}) => {
  const [form] = Form.useForm();
  const { mutate: createFaq, isPending } = useCreateFaq();
  const { mutate: updateFaq, isPending: isUpdatePending } = useUpdateFaq();
  const handleSubmit = async (values: { question: string; answer: string }) => {
    // Call your hook to add or update the FAQ

    if (isEmpty(initialData)) {
      createFaq(values, {
        onError: (error) => {
          // Handle the error
          displayErrorMessage(error);
        },
        onSuccess: (data) => {
          // Handle the success
          form.resetFields();
          notification.success({
            message: "Success",
            description: "FAQ added successfully!",
          });
          queryClient.invalidateQueries({ queryKey: ["faq"] });
          onClose();
        },
      });
    } else {
      const faqData = {
        id: initialData?.id || "",
        question: values?.question,
        answer: values?.answer,
      };
      updateFaq(faqData, {
        onError: (error) => {
          // Handle the error
          displayErrorMessage(error);
        },
        onSuccess: (data) => {
          // Handle the success
          form.resetFields();
          notification.success({
            message: "Success",
            description: "FAQ updated successfully!",
          });
          queryClient.invalidateQueries({ queryKey: ["faq"] });
          onClose();
        },
      });
    }
  };

  useEffect(() => {
    if (!isEmpty(initialData)) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData]);

  return (
    <Modal
      open={visible}
      title={initialData ? "Edit FAQ" : "Add FAQ"}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="question"
          label="Question"
          rules={[{ required: true, message: "Please enter a question!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="answer"
          label="Answer"
          rules={[{ required: true, message: "Please enter an answer!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="!text-white !bg-primary-200"
            loading={isPending || isUpdatePending}
          >
            {initialData ? "Update" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FaqFormModal;
