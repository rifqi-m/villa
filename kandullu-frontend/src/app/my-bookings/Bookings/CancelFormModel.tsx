"use client";
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { useCreateRequest } from "./queries"; // Use your query hook
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { queryClient } from "@/configs/queryClient";
import { isEmpty } from "lodash";

type CancelFormModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  initialData?: any;
};

const CancelFormModal: React.FC<CancelFormModalProps> = ({
  visible,
  onClose,
  onSubmitSuccess,
  initialData,
}) => {
  const [form] = Form.useForm();
  const { mutate: createRequest, isPending } = useCreateRequest();

  const handleSubmit = async (values: any) => {
    // Call your hook to add or update the FAQ

  
      createRequest({
        booking_id:initialData.id,
        ...values
    }, {
        onError: (error) => {
          // Handle the error
          displayErrorMessage(error);
        },
        onSuccess: (data) => {
          // Handle the success
          form.resetFields();
          notification.success({
            message: "Success",
            description: "Request sent successfully!",
          });
          queryClient.invalidateQueries({ queryKey: ["user-booking"] });
          onClose();
        },
      });
 
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
      title={"Cancel Request"}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
       
        <Form.Item
          name="reason"
          label="Reason"
          rules={[{ required: true, message: "Please enter an answer!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="!text-white !bg-primary-200"
            loading={isPending }
          >
            {initialData ? "Update" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CancelFormModal;
