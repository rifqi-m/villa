"use client";
import { queryClient } from "@/configs/queryClient";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Col, notification, Row, Table } from "antd";
import { columns as bookingColumns } from "./columns";
import { useDeleteBooking, useGetBooking } from "./queries";
import { useState } from "react";

type Props = {};

const Booking = (props: Props) => {
  const { data, isLoading } = useGetBooking();
  const { mutate: deleteBooking, isPending: isDeleteLoading } =
    useDeleteBooking();
  const [loadingRow, setLoadingRow] = useState<string | null>(null);
  const handleDeleteBooking = (id: string) => {
    setLoadingRow(id);

    deleteBooking(id, {
      onError: (error) => {
        setLoadingRow(null);
        // Handle the error
        displayErrorMessage(error);
      },
      onSuccess: (data) => {
        setLoadingRow(null);
        notification.success({
          message: "Success",
          description: "Booking deleted successfully!",
        });
        queryClient.invalidateQueries({ queryKey: ["booking"] });
      },
    });
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
                      onClick={() => handleDeleteBooking(record.id)}
                      className="!text-white !bg-primary-200"
                      icon={<DeleteOutlined />}
                      loading={loadingRow === record.id}
                    >
                      Cancel
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
    </Card>
  );
};

export default Booking;
