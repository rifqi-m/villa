"use client";
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, notification, Space, Select } from "antd";
import { FormikErrors, useFormik } from "formik";
import * as Yup from "yup";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { isEmpty, map } from "lodash";
import { useCreateEvent, useUpdateEvent } from "./queries";
import { queryClient } from "@/configs/queryClient";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import FileUpload from "@/components/FileUpload";

type RestaurantFormModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  initialData?: {
    id?: string;
    name: string;
    href: string;
    description: string;
    thumbnail: string;
  };
};

const EventSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  thumbnail: Yup.string().required("Image is required"),
  description: Yup.string().required("Description is required"),
  href: Yup.string().required("Path is required"),
});

const EventFormModal: React.FC<RestaurantFormModalProps> = ({
  visible,
  onClose,
  onSubmitSuccess,
  initialData,
}) => {
  const { mutate: createEvent, isPending } = useCreateEvent();
  const { mutate: updateEvent, isPending: isUpdatePending } = useUpdateEvent();
  const formik = useFormik({
    initialValues: {
      name: "",
      href: "",
      thumbnail: "",
      description: "",

      ...initialData,
    },
    validationSchema: EventSchema,
    onSubmit: async (values) => {
      if (isEmpty(initialData)) {
        createEvent(values, {
          onError: (error) => {
            // Handle the error
            displayErrorMessage(error);
          },
          onSuccess: (data) => {
            // Handle the success

            formik.resetForm();
            notification.success({
              message: "Success",
              description: "local-amenities added successfully!",
            });
            queryClient.invalidateQueries({ queryKey: ["event"] });
            onSubmitSuccess();
            onClose();
          },
        });
      } else {
        updateEvent(
          { id: initialData.id, ...values },
          {
            onError: (error) => {
              // Handle the error
              displayErrorMessage(error);
            },
            onSuccess: (data) => {
              // Handle the success

              formik.resetForm();
              notification.success({
                message: "Success",
                description: "event updated successfully!",
              });
              queryClient.invalidateQueries({ queryKey: ["event"] });
              onSubmitSuccess();
              onClose();
            },
          }
        ); // Your update function here
      }
    },
  });

  useEffect(() => {
    if (!isEmpty(initialData)) {
      formik.setValues(initialData);
    } else {
      formik.resetForm();
    }
  }, [initialData]);

  const handleFileUploadSuccess = (data: any) => {
    formik.setFieldValue(`thumbnail`, data.files[0].path);
  };

  return (
    <Modal
      open={visible}
      title={initialData ? "Edit Amenities" : "Add Amenities"}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item label="Name" required>
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-500">{formik.errors.name}</div>
          )}
        </Form.Item>

        <Form.Item label="Description" required>
          <Input
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.description && formik.touched.description && (
            <div className="text-red-500">{formik.errors.description}</div>
          )}
        </Form.Item>
        <Form.Item label="Path" required>
          <Input
            name="href"
            value={formik.values.href}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.href && formik.touched.href && (
            <div className="text-red-500">{formik.errors.href}</div>
          )}
        </Form.Item>
        <Form.Item label="Thumbnail" required>
          <FileUpload
            multiple={false}
            onUploadSuccess={handleFileUploadSuccess}
            existingFiles={
              formik.values.thumbnail ? [formik.values.thumbnail] : []
            }
            onRemoveFile={() => formik.setFieldValue("thumbnail", "")}
            label="events"
          />
          {formik.errors.thumbnail && formik.touched.thumbnail && (
            <div className="text-red-500">{formik.errors.thumbnail}</div>
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending || isUpdatePending}
            className="!text-white !bg-primary-200"
          >
            {initialData ? "Update" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EventFormModal;
