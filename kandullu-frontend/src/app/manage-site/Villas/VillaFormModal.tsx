"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  notification,
  Space,
  Select,
  InputNumber,
  Row,
} from "antd";
import { FormikErrors, useFormik } from "formik";
import * as Yup from "yup";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { isEmpty, map } from "lodash";
import { useCreateVilla, useUpdateVilla } from "./queries";
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
    about: string;
    gallery: {
      url: string;
      index: string;
    }[];
    description: string;
    summary: string;
    facilities: { icon: string; name: string }[];
    room_rates: { name: string; rates: string }[];
    baths: number;
    beds: number;
    max_guest: number;
  };
};

const VillaSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),

  about: Yup.string().required("About is required"),
  description: Yup.string().required("Description is required"),
  gallery: Yup.array()
    .of(
      Yup.object().shape({
        url: Yup.string().required("Image URL is required"),
        index: Yup.string().required("Index is required"),
      })
    )
    .required("Gallery is required"),
  summary: Yup.string()
    .max(150, "Summary must be at most 150 characters")
    .required("Summary is required"),
  facilities: Yup.array()
    .of(
      Yup.object().shape({
        icon: Yup.string().required("Icon is required"),
        name: Yup.string().required("Name is required"),
      })
    )
    .required("Facilities are required"),
  room_rates: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
        rates: Yup.string().required("Rates are required"),
      })
    )
    .required("Room Rates are required"),
  baths: Yup.number().required("Baths  are required"),
  beds: Yup.number().required("beds  are required"),
  max_guest: Yup.number().required("max_guest are required"),
});

const VillaFormModal: React.FC<RestaurantFormModalProps> = ({
  visible,
  onClose,
  onSubmitSuccess,
  initialData,
}) => {
  const { mutate: createVilla, isPending } = useCreateVilla();
  const { mutate: updateVilla, isPending: isUpdatePending } = useUpdateVilla();
  const formik = useFormik({
    initialValues: {
      title: "",
      gallery: [],
      description: "",
      about: "",
      summary: "",
      facilities: [],
      room_rates: [],
      beds: 0,
      baths: 0,
      max_guest: 0,

      ...initialData,
    },
    validationSchema: VillaSchema,
    onSubmit: async (values) => {
      if (isEmpty(initialData)) {
        createVilla(values, {
          onError: (error) => {
            // Handle the error
            displayErrorMessage(error);
          },
          onSuccess: (data) => {
            // Handle the success

            formik.resetForm();
            notification.success({
              message: "Success",
              description: "villa added successfully!",
            });
            queryClient.invalidateQueries({ queryKey: ["villa"] });
            onSubmitSuccess();
            onClose();
          },
        });
      } else {
        updateVilla(
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
                description: "villa updated successfully!",
              });
              queryClient.invalidateQueries({ queryKey: ["villa"] });
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
    const updatedGallery = [
      ...formik.values.gallery,
      ...map(data.files, (item, index) => ({
        url: item.path,
        index: (formik.values.gallery.length + index).toString(),
      })),
    ];
    formik.setFieldValue("gallery", updatedGallery);
  };

  return (
    <Modal
      open={visible}
      title={initialData ? "Edit Villa" : "Add Villa"}
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
        <Form.Item label="About" required>
          <Input
            name="about"
            value={formik.values.about}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.about && formik.touched.about && (
            <div className="text-red-500">{formik.errors.about}</div>
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
        <Form.Item label="Summary" required>
          <Input
            name="summary"
            value={formik.values.summary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.summary && formik.touched.summary && (
            <div className="text-red-500">{formik.errors.summary}</div>
          )}
        </Form.Item>
        <Row align={"middle"} justify={"space-around"}>
          <Form.Item label="Beds" required>
            <InputNumber
              name="beds"
              value={formik.values.beds}
              onChange={(value) => formik.setFieldValue("beds", value)}
              onBlur={formik.handleBlur}
            />
            {formik.errors.beds && formik.touched.beds && (
              <div className="text-red-500">{formik.errors.beds}</div>
            )}
          </Form.Item>
          <Form.Item label="Baths" required>
            <InputNumber
              name="baths"
              value={formik.values.baths}
              onChange={(value) => formik.setFieldValue("baths", value)}
              onBlur={formik.handleBlur}
            />
            {formik.errors.baths && formik.touched.baths && (
              <div className="text-red-500">{formik.errors.baths}</div>
            )}
          </Form.Item>
          <Form.Item label="Max Guests" required>
            <InputNumber
              name="max_guest"
              value={formik.values.max_guest}
              onChange={(value) => formik.setFieldValue("max_guest", value)}
              onBlur={formik.handleBlur}
            />
            {formik.errors.max_guest && formik.touched.max_guest && (
              <div className="text-red-500">{formik.errors.max_guest}</div>
            )}
          </Form.Item>
        </Row>

        <Form.Item label="Room Rates" required>
          <Form.List name="room_rates">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      rules={[{ required: true, message: "Name is required" }]}
                    >
                      <Input
                        placeholder="Season Name"
                        {...restField}
                        name={`room_rates[${name}].name`}
                        value={formik.values.room_rates[name]?.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Item>
                    <Form.Item
                      rules={[
                        { required: true, message: "Rates are required" },
                      ]}
                    >
                      <Input
                        placeholder="Rates"
                        {...restField}
                        name={`room_rates[${name}].rates`}
                        value={formik.values.room_rates[name]?.rates}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Room Rate
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          {formik.errors.room_rates && formik.touched.room_rates && (
            <div className="text-red-500">
              {Array.isArray(formik.errors.room_rates)
                ? map(formik.errors.room_rates, (error, index) => (
                    <div key={index}>
                      {(error as any)?.name || (error as any)?.rates}
                    </div>
                  ))
                : formik.errors.room_rates}
            </div>
          )}
        </Form.Item>

        <Form.Item label="Facilities" required>
          <Form.List name="facilities">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      rules={[{ required: true, message: "Icon is required" }]}
                    >
                      <Input
                        placeholder="Icon"
                        {...restField}
                        name={`facilities[${name}].icon`}
                        value={formik.values.facilities[name]?.icon}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Item>
                    <Form.Item
                      rules={[{ required: true, message: "Name is required" }]}
                    >
                      <Input
                        placeholder="Facility Name"
                        {...restField}
                        name={`facilities[${name}].name`}
                        value={formik.values.facilities[name]?.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Facility
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          {formik.errors.facilities && formik.touched.facilities && (
            <div className="text-red-500">
              {Array.isArray(formik.errors.facilities)
                ? map(formik.errors.facilities, (error, index) => (
                    <div key={index}>
                      {(error as any)?.icon || (error as any)?.name}
                    </div>
                  ))
                : formik.errors.facilities}
            </div>
          )}
        </Form.Item>
        <Form.Item label="Gallery" required>
          <FileUpload
            existingFiles={map(formik.values.gallery, "url")}
            multiple
            onRemoveFile={(url) => {
              const updatedGallery = formik.values.gallery.filter(
                (item) => item.url !== url
              );
              formik.setFieldValue("gallery", updatedGallery);
            }}
            onUploadSuccess={handleFileUploadSuccess}
            label="Villas"
          />
          {formik.errors.gallery && formik.touched.gallery && (
            <div className="text-red-500">{formik.errors.gallery as any}</div>
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

export default VillaFormModal;
