"use client";
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, notification, Space, Select } from "antd";
import { FormikErrors, useFormik } from "formik";
import * as Yup from "yup";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { isEmpty, map } from "lodash";
import { useCreateAmenities, useUpdateAmenities } from "./queries";
import { queryClient } from "@/configs/queryClient";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import FileUpload from "@/components/FileUpload";

type RestaurantFormModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  initialData?: {
    id: string;
    title: string;
    image: string;
    description: string;
    path: string;
  };
};

const AmenitiesSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  image: Yup.string().required("Image is required"),
  description: Yup.string().required("Description is required"),
});

const AmenitiesFormModal: React.FC<RestaurantFormModalProps> = ({
  visible,
  onClose,
  onSubmitSuccess,
  initialData,
}) => {
  const { mutate: createAmenities, isPending } = useCreateAmenities();
  const { mutate: updateAmenities, isPending: isUpdatePending } =
    useUpdateAmenities();
  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      path: "",
      description: "",

      ...initialData,
    },
    validationSchema: AmenitiesSchema,
    onSubmit: async (values) => {
      if (isEmpty(initialData)) {
        createAmenities(values, {
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
            queryClient.invalidateQueries({ queryKey: ["local-amenities"] });
            onSubmitSuccess();
            onClose();
          },
        });
      } else {
        updateAmenities(
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
                description: "local-amenities updated successfully!",
              });
              queryClient.invalidateQueries({ queryKey: ["local-amenities"] });
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
    formik.setFieldValue(`image`, data.files[0].path);
  };

  return (
    <Modal
      open={visible}
      title={initialData ? "Edit Amenities" : "Add Amenities"}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item label="Title" required>
          <Input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.title && formik.touched.title && (
            <div className="text-red-500">{formik.errors.title}</div>
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
        <Form.Item label="Image" required>
          <FileUpload
            multiple={false}
            onUploadSuccess={handleFileUploadSuccess}
            existingFiles={formik.values.image ? [formik.values.image] : []}
            onRemoveFile={() => formik.setFieldValue("image", "")}
            label="local-amenities"
          />
          {formik.errors.image && formik.touched.image && (
            <div className="text-red-500">{formik.errors.image}</div>
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

export default AmenitiesFormModal;
