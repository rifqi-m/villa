"use client";
import React, { useState } from "react";
import { useDeleteAmentites, useGetAmenities } from "./queries";
import { Button, Card, Col, notification, Row, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { columns as restaurantColumns } from "./columns";
import AmenitiesFormModal from "./AmenitiesFormModal";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { queryClient } from "@/configs/queryClient";
import { size } from "lodash";

type Props = {};

const Amenities = (props: Props) => {
  const { data, isLoading } = useGetAmenities();

  const { mutate: deleteAmentites, isPending: isDeleteLoading } =
    useDeleteAmentites();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localAmenities, setLocalAmenities] = useState<any>(null);
  const [loadingRow, setLoadingRow] = useState<string | null>(null);

  const showAddModal = () => {
    setLocalAmenities(null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalSuccess = () => {
    handleModalClose();
  };

  const handleEditAmenities = (record: {
    id: string;
    question: string;
    answer: string;
  }) => {
    setLocalAmenities(record);
    setIsModalVisible(true);
  };
  const handleDeleteRestaurant = (id: string) => {
    setLoadingRow(id);

    deleteAmentites(id, {
      onError: (error) => {
        setLoadingRow(null);
        // Handle the error
        displayErrorMessage(error);
      },
      onSuccess: (data) => {
        setLoadingRow(null);
        notification.success({
          message: "Success",
          description: "Amenity deleted successfully!",
        });
        queryClient.invalidateQueries({ queryKey: ["local-amenities"] });
      },
    });
  };

  return (
    <Card className="dark:bg-neutral-900 dark:text-white">
      <Row>
        <Col span={24} className="!flex !items-center !justify-end">
          <Button
            className={`${"!text-white !bg-primary-200"}`}
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
                      onClick={() => handleEditAmenities(record)}
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
      <AmenitiesFormModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onSubmitSuccess={handleModalSuccess}
        initialData={localAmenities || undefined}
      />
    </Card>
  );
};

export default Amenities;
