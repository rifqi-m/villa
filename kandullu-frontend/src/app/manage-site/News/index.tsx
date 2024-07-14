"use client";
import React, { useState } from "react";
import { newsType, useDeleteNews, useGetNews } from "./queries";
import { Button, Card, Col, notification, Row, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { columns as faqColumns } from "./columns";
import NewsFormModal from "./NewsFormModal";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { queryClient } from "@/configs/queryClient";

type Props = {};

const FAQ = (props: Props) => {
  const { data, isLoading } = useGetNews();
  const { mutate: deleteNews, isPending: isDeleteLoading } = useDeleteNews();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentNews, setCurrentNews] = useState<newsType | null>(null);
  const [loadingRow, setLoadingRow] = useState<string | null>(null);

  const showAddModal = () => {
    setCurrentNews(null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalSuccess = () => {
    handleModalClose();
  };

  const handleEditFaq = (record: newsType) => {
    setCurrentNews(record);
    setIsModalVisible(true);
  };
  const handleDeleteNews = (id: string) => {
    setLoadingRow(id);

    deleteNews(id, {
      onError: (error) => {
        setLoadingRow(null);
        // Handle the error
        displayErrorMessage(error);
      },
      onSuccess: (data) => {
        setLoadingRow(null);
        notification.success({
          message: "Success",
          description: "news deleted successfully!",
        });
        queryClient.invalidateQueries({ queryKey: ["contact-us"] });
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
            rowKey={"id"}
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
                  <Row
                    align={"middle"}
                    justify={"space-around"}
                    key={record.id}
                  >
                    <Button
                      onClick={() => handleEditFaq(record)}
                      className="!text-white !bg-primary-200"
                      icon={<EditOutlined />}
                    ></Button>
                    <Button
                      onClick={() => handleDeleteNews(record.id)}
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
      <NewsFormModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onSubmitSuccess={handleModalSuccess}
        initialData={currentNews || undefined}
      />
    </Card>
  );
};

export default FAQ;
