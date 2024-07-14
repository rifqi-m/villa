"use client";
import React, { useState } from "react";
import { useDeleteRestaurant, useGetRestaurant } from "./queries";
import { Button, Card, Col, notification, Row, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { columns as restaurantColumns } from "./columns";
import RestaurantFormModal from "./RestaurantFormModal";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { queryClient } from "@/configs/queryClient";
import { size } from "lodash";

type Props = {};

const Restaurant = (props: Props) => {
  const { data, isLoading } = useGetRestaurant();

  const { mutate: deleteRestaurant, isPending: isDeleteLoading } =
    useDeleteRestaurant();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState<any>(null);
  const [loadingRow, setLoadingRow] = useState<string | null>(null);

  const showAddModal = () => {
    setCurrentRestaurant(null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalSuccess = () => {
    handleModalClose();
  };

  const handleEditRestaurant = (record: {
    id: string;
    question: string;
    answer: string;
  }) => {
    setCurrentRestaurant(record);
    setIsModalVisible(true);
  };
  const handleDeleteRestaurant = (id: string) => {
    setLoadingRow(id);

    deleteRestaurant(id, {
      onError: (error) => {
        // Handle the error
        setLoadingRow(null);
        displayErrorMessage(error);
      },
      onSuccess: (data) => {
        setLoadingRow(null);
        notification.success({
          message: "Success",
          description: "Restaurant deleted successfully!",
        });
        queryClient.invalidateQueries({ queryKey: ["restaurant"] });
      },
    });
  };

  return (
    <Card className="dark:bg-neutral-900 dark:text-white">
      <Row>
        <Col span={24} className="!flex !items-center !justify-end">
          <Button
            className={`${
              size(data) > 0
                ? "!text-white !bg-gray-400"
                : "!text-white !bg-primary-200"
            }`}
            disabled={size(data) > 0}
            onClick={showAddModal}
            icon={<PlusOutlined />}
          ></Button>
        </Col>
        <Col span={24}>
          <Table
            rowKey={"id"}
            rowClassName={"dark:bg-neutral-900 dark:text-neutral-200"}
            loading={isLoading}
            dataSource={data}
            columns={[
              ...restaurantColumns,
              {
                title: "Actions",
                key: "actions",
                width: 150,
                className: "dark:!bg-neutral-900 dark:!text-neutral-200",
                render: (_: any, record: any) => (
                  <Row align={"middle"} justify={"space-around"}>
                    <Button
                      key={record.id}
                      onClick={() => handleEditRestaurant(record)}
                      className="!text-white !bg-primary-200"
                      icon={<EditOutlined />}
                    ></Button>
                    <Button
                      key={record.id}
                      onClick={() => handleDeleteRestaurant(record.id)}
                      className="!text-white !bg-primary-200"
                      icon={<DeleteOutlined />}
                      loading={loadingRow === record.id}
                    ></Button>
                  </Row>
                ),
              },
            ]}
            pagination={{
              pageSize: 5,
              className: "dark:!bg-neutral-900 dark:!text-neutral-200",
            }}
          />
        </Col>
      </Row>
      <RestaurantFormModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onSubmitSuccess={handleModalSuccess}
        initialData={currentRestaurant || undefined}
      />
    </Card>
  );
};

export default Restaurant;
