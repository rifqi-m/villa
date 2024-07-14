"use client";
import React, { useState } from "react";
import { useDeleteVilla, useGetVillas } from "./queries";
import { Button, Card, Col, notification, Row, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { columns as restaurantColumns } from "./columns";
import VillaFormModal from "./VillaFormModal";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { queryClient } from "@/configs/queryClient";
import { size } from "lodash";

type Props = {};

const Villas = (props: Props) => {
  const { data, isLoading } = useGetVillas();

  const { mutate: deleteVilla, isPending: isDeleteLoading } = useDeleteVilla();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadingRow, setLoadingRow] = useState<string | null>(null);
  const [villa, setVilla] = useState<any>(null);

  const showAddModal = () => {
    setVilla(null);
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
    setVilla(record);
    setIsModalVisible(true);
  };
  const handleDeleteRestaurant = (id: string) => {
    setLoadingRow(id);
    deleteVilla(id, {
      onError: (error) => {
        setLoadingRow(null);
        // Handle the error
        displayErrorMessage(error);
      },
      onSuccess: (data) => {
        setLoadingRow(null);
        notification.success({
          message: "Success",
          description: "Villa deleted successfully!",
        });
        queryClient.invalidateQueries({ queryKey: ["villa"] });
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
      <VillaFormModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onSubmitSuccess={handleModalSuccess}
        initialData={villa || undefined}
      />
    </Card>
  );
};

export default Villas;
