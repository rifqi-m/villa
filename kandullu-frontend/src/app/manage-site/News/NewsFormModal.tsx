"use client";
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { newsType, useCreateNews, useUpdateNews } from "./queries"; // Use your query hook
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { queryClient } from "@/configs/queryClient";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { FormikErrors, useFormik } from "formik";
import * as Yup from "yup";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
} from "ckeditor5";

import { isEmpty } from "lodash";
import FileUpload from "@/components/FileUpload";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("./Editor"), { ssr: false });

type NewsFormModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  initialData?: newsType;
};

const NewsSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  subtitle: Yup.string().required("Subtitle is required"),
  main_image: Yup.string().required("Image is required"),
  content: Yup.string().required("content"),
});

const NewsFormModal: React.FC<NewsFormModalProps> = ({
  visible,
  onClose,
  onSubmitSuccess,
  initialData,
}) => {
  const [form] = Form.useForm();
  const { mutate: createNews, isPending } = useCreateNews();
  const { mutate: updateNews, isPending: isUpdatePending } = useUpdateNews();

  const formik = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
      main_image: "",
      content: "",
      ...initialData,
    },
    validationSchema: NewsSchema,
    onSubmit: async (values: {
      title: string;
      subtitle: string;
      main_image: string;
      content: string;
    }) => {
      const AUTH =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("auth") as string)
          : null;

      if (isEmpty(initialData)) {
        createNews(
          {
            user_id: AUTH.user.id,
            ...values,
          },
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
                description: "News added successfully!",
              });
              queryClient.invalidateQueries({ queryKey: ["news"] });
              onSubmitSuccess();
              onClose();
            },
          }
        );
      } else {
        const newsData = {
          id: initialData?.id || "",
          user_id: AUTH.user.id,
          ...values,
        };
        updateNews(newsData, {
          onError: (error) => {
            // Handle the error
            displayErrorMessage(error);
          },
          onSuccess: (data) => {
            // Handle the success
            formik.resetForm();
            notification.success({
              message: "Success",
              description: "News updated successfully!",
            });
            queryClient.invalidateQueries({ queryKey: ["news"] });
            onSubmitSuccess();
            onClose();
          },
        });
      }
    },
  });

  useEffect(() => {
    if (!isEmpty(initialData)) {
      formik.setValues({
        ...initialData,
        content: initialData.content || "", // Ensure content is initialized
      });
    } else {
      formik.resetForm();
    }
  }, [initialData]);

  const handleFileUploadSuccess = (data: any) => {
    formik.setFieldValue(`main_image`, data.files[0].path);
  };

  return (
    <Modal
      open={visible}
      title={initialData ? "Edit News" : "Add News"}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={formik.handleSubmit}>
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
        <Form.Item label="Subtitle" required>
          <Input
            name="subtitle"
            value={formik.values.subtitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.subtitle && formik.touched.subtitle && (
            <div className="text-red-500">{formik.errors.subtitle}</div>
          )}
        </Form.Item>
        <Form.Item label="Image" required>
          <FileUpload
            multiple={false}
            onUploadSuccess={handleFileUploadSuccess}
            existingFiles={
              formik.values.main_image ? [formik.values.main_image] : []
            }
            onRemoveFile={() => formik.setFieldValue("main_image", "")}
            label="news_Image"
          />
          {formik.errors.main_image && formik.touched.main_image && (
            <div className="text-red-500">{formik.errors.main_image}</div>
          )}
        </Form.Item>
        <Form.Item
          label="Content"
          rules={[{ required: true, message: "Please enter content!" }]}
        >
          <Editor
            value={formik.values.content}
            onChange={(value: any) => formik.setFieldValue("content", value)}
          />
          {formik.errors.content && formik.touched.content && (
            <div className="text-red-500">{formik.errors.content}</div>
          )}
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

export default NewsFormModal;
