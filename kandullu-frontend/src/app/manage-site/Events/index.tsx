"use client";
import React, { useState } from "react";
import { useDeleteEvent, useGetEvent } from "./queries";
import { Button, Card, Col, notification, Row, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { columns as eventColumns } from "./columns";
import EventFormModal from "./EventFormModal";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { queryClient } from "@/configs/queryClient";
import { size } from "lodash";

type Props = {};

const Event = (props: Props) => {
  const { data, isLoading } = useGetEvent();

  const { mutate: deleteEvent, isPending: isDeleteLoading } = useDeleteEvent();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localEvent, setLocalEvent] = useState<any>(null);
  const [loadingRow, setLoadingRow] = useState<string | null>(null);

  const showAddModal = () => {
    setLocalEvent(null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalSuccess = () => {
    handleModalClose();
  };

  const handleEditEvent = (record: {
    id: string;
    question: string;
    answer: string;
  }) => {
    setLocalEvent(record);
    setIsModalVisible(true);
  };
  const handleDeleteRestaurant = (id: string) => {
    setLoadingRow(id);
    deleteEvent(id, {
      onError: (error) => {
        // Handle the error
        setLoadingRow(null);
        displayErrorMessage(error);
      },
      onSuccess: (data) => {
        setLoadingRow(null);
        notification.success({
          message: "Success",
          description: "Amenity deleted successfully!",
        });
        queryClient.invalidateQueries({ queryKey: ["event"] });
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
              ...eventColumns,
              {
                title: "Actions",
                key: "actions",
                width: 150,
                className: "dark:!bg-neutral-900 dark:!text-neutral-200",
                render: (_: any, record: any) => (
                  <Row align={"middle"} justify={"space-around"}>
                    <Button
                      key={record.id}
                      onClick={() => handleEditEvent(record)}
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
      <EventFormModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onSubmitSuccess={handleModalSuccess}
        initialData={localEvent || undefined}
      />
    </Card>
  );
};

export default Event;
