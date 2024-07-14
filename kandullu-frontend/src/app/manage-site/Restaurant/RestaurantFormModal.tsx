"use client";
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, notification, Space, Select } from "antd";
import { FormikErrors, useFormik } from "formik";
import * as Yup from "yup";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { isEmpty, map } from "lodash";
import { useCreateRestaurant, useUpdateRestaurant } from "./queries";
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
    menu: {
      _id: string;
      image: string;
      title: string;
      description: string;
      price: number;
      foodType: string;
    }[];
    timings: {
      breakfast: string;
      lunch: string;
      dinner: string;
    };
    gallery: {
      url: string;
      index: string;
    }[];
    description: string;
    summary: string;
  };
};

const RestaurantSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  about: Yup.string().required("About is required"),
  menu: Yup.array()
    .of(
      Yup.object().shape({
        _id: Yup.string().required("ID is required"),
        image: Yup.string().required("Image URL is required"),
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        price: Yup.number().required("Price is required"),
        foodType: Yup.string().required("Food type is required"),
      })
    )
    .required("Menu is required"),
  timings: Yup.object()
    .shape({
      breakfast: Yup.string().required("Breakfast timings are required"),
      lunch: Yup.string().required("Lunch timings are required"),
      dinner: Yup.string().required("Dinner timings are required"),
    })
    .required("Timings are required"),
  gallery: Yup.array()
    .of(
      Yup.object().shape({
        url: Yup.string().required("Image URL is required"),
        index: Yup.string().required("Index is required"),
      })
    )
    .required("Gallery is required"),
  description: Yup.string().required("Description is required"),
  summary: Yup.string()
    .max(150, "Summary must be at most 150 characters")
    .required("Summary is required"),
});

const RestaurantFormModal: React.FC<RestaurantFormModalProps> = ({
  visible,
  onClose,
  onSubmitSuccess,
  initialData,
}) => {
  const { mutate: createRestaurant, isPending } = useCreateRestaurant();
  const { mutate: updateRestaurant, isPending: isUpdatePending } =
    useUpdateRestaurant();
  const formik = useFormik({
    initialValues: {
      title: "",
      about: "",
      menu: [
        {
          _id: "",
          image: "",
          title: "",
          description: "",
          price: 0,
          foodType: "",
        },
      ],
      timings: { breakfast: "", lunch: "", dinner: "" },
      gallery: [{ url: "", index: "" }],
      description: "",
      summary: "",
      ...initialData,
    },
    validationSchema: RestaurantSchema,
    onSubmit: async (values) => {
      if (isEmpty(initialData)) {
        createRestaurant(values, {
          onError: (error) => {
            // Handle the error
            displayErrorMessage(error);
          },
          onSuccess: (data) => {
            // Handle the success

            formik.resetForm();
            notification.success({
              message: "Success",
              description: "Restaurant added successfully!",
            });
            queryClient.invalidateQueries({ queryKey: ["restaurant"] });
            onSubmitSuccess();
            onClose();
          },
        });
      } else {
        updateRestaurant(
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
                description: "Restaurant updated successfully!",
              });
              queryClient.invalidateQueries({ queryKey: ["restaurant"] });
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

  const handleMenuUploadSuccess = (data: any, menuIndex: number) => {
    formik.setFieldValue(`menu[${menuIndex}].image`, data.files[0].path);
  };

  return (
    <Modal
      open={visible}
      title={initialData ? "Edit Restaurant" : "Add Restaurant"}
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

        <Form.Item label="Summary (max 150 characters)" required>
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

        <Form.Item label="Timings" required>
          <Space direction="vertical" className="w-full">
            <Input
              name="timings.breakfast"
              placeholder="Breakfast timings"
              value={formik.values.timings.breakfast}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.timings?.breakfast &&
              formik.touched.timings?.breakfast && (
                <div className="text-red-500">
                  {formik.errors.timings.breakfast}
                </div>
              )}
            <Input
              name="timings.lunch"
              placeholder="Lunch timings"
              value={formik.values.timings.lunch}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.timings?.lunch && formik.touched.timings?.lunch && (
              <div className="text-red-500">{formik.errors.timings.lunch}</div>
            )}
            <Input
              name="timings.dinner"
              placeholder="Dinner timings"
              value={formik.values.timings.dinner}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.timings?.dinner &&
              formik.touched.timings?.dinner && (
                <div className="text-red-500">
                  {formik.errors.timings.dinner}
                </div>
              )}
          </Space>
        </Form.Item>

        <Form.List name="menu">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <div key={key} className="border p-4 mb-4">
                  <Form.Item label={`Menu Item ${key + 1}`} required>
                    <Space direction="vertical" className="w-full">
                      <Input
                        {...restField}
                        name={`menu[${name}]._id`}
                        placeholder="ID"
                        value={formik.values.menu[name]?._id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {(
                        formik.errors.menu as FormikErrors<{
                          _id: string;
                          image: string;
                          title: string;
                          description: string;
                          price: number;
                          foodType: string;
                        }>[]
                      )?.at(name)?._id &&
                        formik.touched.menu?.[name]?._id && (
                          <div className="text-red-500">
                            {
                              (
                                formik.errors.menu as FormikErrors<{
                                  _id: string;
                                  image: string;
                                  title: string;
                                  description: string;
                                  price: number;
                                  foodType: string;
                                }>[]
                              )?.at(name)?._id
                            }
                          </div>
                        )}
                      <Form.Item
                        {...restField}
                        label="Item image"
                        name={`menu[${name}].image`}
                      >
                        <FileUpload
                          multiple={false}
                          existingFiles={
                            formik.values.menu[name]?.image
                              ? [formik.values.menu[name]?.image]
                              : []
                          }
                          onRemoveFile={() =>
                            formik.setFieldValue(`menu[${name}].image`, "")
                          }
                          onUploadSuccess={(urls) =>
                            handleMenuUploadSuccess(urls, name)
                          }
                          label="Menu"
                        />
                      </Form.Item>
                      {(
                        formik.errors.menu as FormikErrors<{
                          _id: string;
                          image: string;
                          title: string;
                          description: string;
                          price: number;
                          foodType: string;
                        }>[]
                      )?.at(name)?.image &&
                        formik.touched.menu?.[name]?.image && (
                          <div className="text-red-500">
                            {
                              (
                                formik.errors.menu as FormikErrors<{
                                  _id: string;
                                  image: string;
                                  title: string;
                                  description: string;
                                  price: number;
                                  foodType: string;
                                }>[]
                              )?.at(name)?.image
                            }
                          </div>
                        )}
                      <Input
                        {...restField}
                        name={`menu[${name}].title`}
                        placeholder="Title"
                        value={formik.values.menu[name]?.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {(
                        formik.errors.menu as FormikErrors<{
                          _id: string;
                          image: string;
                          title: string;
                          description: string;
                          price: number;
                          foodType: string;
                        }>[]
                      )?.at(name)?.title &&
                        formik.touched.menu?.[name]?.title && (
                          <div className="text-red-500">
                            {
                              (
                                formik.errors.menu as FormikErrors<{
                                  _id: string;
                                  image: string;
                                  title: string;
                                  description: string;
                                  price: number;
                                  foodType: string;
                                }>[]
                              )?.at(name)?.title
                            }
                          </div>
                        )}
                      <Input
                        {...restField}
                        name={`menu[${name}].description`}
                        placeholder="Description"
                        value={formik.values.menu[name]?.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {(
                        formik.errors.menu as FormikErrors<{
                          _id: string;
                          image: string;
                          title: string;
                          description: string;
                          price: number;
                          foodType: string;
                        }>[]
                      )?.at(name)?.description &&
                        formik.touched.menu?.[name]?.description && (
                          <div className="text-red-500">
                            {
                              (
                                formik.errors.menu as FormikErrors<{
                                  _id: string;
                                  image: string;
                                  title: string;
                                  description: string;
                                  price: number;
                                  foodType: string;
                                }>[]
                              )?.at(name)?.description
                            }
                          </div>
                        )}
                      <Input
                        {...restField}
                        name={`menu[${name}].price`}
                        placeholder="Price"
                        value={formik.values.menu[name]?.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {(
                        formik.errors.menu as FormikErrors<{
                          _id: string;
                          image: string;
                          title: string;
                          description: string;
                          price: number;
                          foodType: string;
                        }>[]
                      )?.at(name)?.price &&
                        formik.touched.menu?.[name]?.price && (
                          <div className="text-red-500">
                            {
                              (
                                formik.errors.menu as FormikErrors<{
                                  _id: string;
                                  image: string;
                                  title: string;
                                  description: string;
                                  price: number;
                                  foodType: string;
                                }>[]
                              )?.at(name)?.price
                            }
                          </div>
                        )}
                      <Select
                        {...restField}
                        placeholder="Food Type"
                        value={formik.values.menu[name]?.foodType}
                        onChange={(value) =>
                          formik.setFieldValue(`menu[${name}].foodType`, value)
                        }
                        onBlur={formik.handleBlur}
                      >
                        <Select.Option value="breakfast">
                          Breakfast
                        </Select.Option>
                        <Select.Option value="lunch">Lunch</Select.Option>
                        <Select.Option value="dinner">Dinner</Select.Option>
                      </Select>
                      {(
                        formik.errors.menu as FormikErrors<{
                          _id: string;
                          image: string;
                          title: string;
                          description: string;
                          price: number;
                          foodType: string;
                        }>[]
                      )?.at(name)?.foodType &&
                        formik.touched.menu?.[name]?.foodType && (
                          <div className="text-red-500">
                            {
                              (
                                formik.errors.menu as FormikErrors<{
                                  _id: string;
                                  image: string;
                                  title: string;
                                  description: string;
                                  price: number;
                                  foodType: string;
                                }>[]
                              )?.at(name)?.foodType
                            }
                          </div>
                        )}
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  </Form.Item>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Menu Item
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

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
            label="restaurant"
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

export default RestaurantFormModal;
