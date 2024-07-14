"use client";
import { queryClient } from "@/configs/queryClient";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Col, notification, Row, Table } from "antd";
import { columns as bookingColumns } from "./columns";
import { useGetBooking } from "./queries";
import { useState } from "react";
import CancelFormModal from "./CancelFormModel";

type Props = {};

const Booking = (props: Props) => {
  const AUTH =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("auth") as string)
      : null;
  const { data, isLoading } = useGetBooking(AUTH?.user?.id);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [request, setReuqest] = useState<any>(null);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalSuccess = () => {
    handleModalClose();
  };

  const handleEditRequest = (record: {
    id: string;
    question: string;
    answer: string;
  }) => {
    setReuqest(record);
    setIsModalVisible(true);
  };

  return (
    <Card className="dark:bg-neutral-900 dark:text-white">
      <Row>
        <Col span={24}>
          <Table
            rowClassName={"dark:bg-neutral-900 dark:text-neutral-200"}
            loading={isLoading}
            dataSource={data}
            columns={[
              ...bookingColumns,
              {
                title: "Actions",
                key: "actions",
                width: 150,
                className: "dark:!bg-neutral-900 dark:!text-neutral-200",
                render: (_: any, record: any) => (
                  <Row align={"middle"} justify={"space-around"}>
                    <Button
                      onClick={() => handleEditRequest(record)}
                      className="!text-white !bg-primary-200"
                      icon={<DeleteOutlined />}
                    >
                      {" "}
                      Cancel Request
                    </Button>
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
      <CancelFormModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onSubmitSuccess={handleModalSuccess}
        initialData={request || undefined}
      />
    </Card>
  );
};

export default Booking;
