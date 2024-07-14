"use client";
import React, { useState } from "react";
import { useDeleteFaq, useGetFaq } from "./queries";
import { Button, Card, Col, notification, Row, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { columns as faqColumns } from "./columns";
import FaqFormModal from "./FaqFormModal";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { queryClient } from "@/configs/queryClient";

type Props = {};

const FAQ = (props: Props) => {
  const { data, isLoading } = useGetFaq();
  const { mutate: deleteFaq, isPending: isDeleteLoading } = useDeleteFaq();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadingRow, setLoadingRow] = useState<string | null>(null);
  const [currentFaq, setCurrentFaq] = useState<{
    id?: string;
    question?: string;
    answer?: string;
  } | null>(null);

  const showAddModal = () => {
    setCurrentFaq(null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalSuccess = () => {
    handleModalClose();
  };

  const handleEditFaq = (record: {
    id: string;
    question: string;
    answer: string;
  }) => {
    setCurrentFaq(record);
    setIsModalVisible(true);
  };
  const handleDeleteFaq = (id: string) => {
    setLoadingRow(id);

    deleteFaq(id, {
      onError: (error) => {
        setLoadingRow(null);
        // Handle the error
        displayErrorMessage(error);
      },
      onSuccess: (data) => {
        setLoadingRow(null);
        notification.success({
          message: "Success",
          description: "FAQ deleted successfully!",
        });
        queryClient.invalidateQueries({ queryKey: ["faq"] });
      },
    });
  };

  return (
    <Card className="dark:bg-neutral-900 dark:text-white">
      <Row>
        <Col span={24} className="!flex !items-center !justify-end">
          <Button
            className="!text-white !bg-primary-200"
            onClick={showAddModal}
            icon={<PlusOutlined />}
          ></Button>
        </Col>
        <Col span={24}>
          <Table
            rowClassName={"dark:bg-neutral-900 dark:text-neutral-200"}
            loading={isLoading}
            dataSource={data}
            columns={[
              ...faqColumns,
              {
                title: "Actions",
                key: "actions",
                width: 150,
                className: "dark:!bg-neutral-900 dark:!text-neutral-200",
                render: (_: any, record: any) => (
                  <Row align={"middle"} justify={"space-around"}>
                    <Button
                      onClick={() => handleEditFaq(record)}
                      className="!text-white !bg-primary-200"
                      icon={<EditOutlined />}
                    ></Button>
                    <Button
                      onClick={() => handleDeleteFaq(record.id)}
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
      <FaqFormModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onSubmitSuccess={handleModalSuccess}
        initialData={currentFaq || undefined}
      />
    </Card>
  );
};

export default FAQ;
