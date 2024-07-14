"use client";
import { useState } from "react";
import { queryClient } from "@/configs/queryClient";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Col, notification, Row, Table } from "antd";
import { columns as cancelColumns } from "./columns";
import { useDeniedRequest, useGetRequests, useRequestApprove } from "./queries";

type Props = {};

const Booking = (props: Props) => {
  const { data, isLoading } = useGetRequests();
  const { mutate: denyRequest } = useDeniedRequest();
  const { mutate: requestApprove } = useRequestApprove();

  // State to track the loading state of each row
  const [loadingRow, setLoadingRow] = useState<string | null>(null);
  const [loadingApproveRow, setLoadingApproveRow] = useState<string | null>(
    null
  );

  const handleDenyRequest = (id: string) => {
    setLoadingRow(id);
    denyRequest(id, {
      onError: (error) => {
        setLoadingRow(null);
        displayErrorMessage(error);
      },
      onSuccess: (data) => {
        setLoadingRow(null);
        notification.success({
          message: "Success",
          description: "Request denied successfully!",
        });
        queryClient.invalidateQueries({ queryKey: ["cancel-request"] });
      },
    });
  };

  const handleApproveRequest = (id: string) => {
    setLoadingApproveRow(id);
    requestApprove(id, {
      onError: (error) => {
        setLoadingApproveRow(null);
        displayErrorMessage(error);
      },
      onSuccess: (data) => {
        setLoadingApproveRow(null);
        notification.success({
          message: "Success",
          description: "Request approved successfully!",
        });
        queryClient.invalidateQueries({ queryKey: ["cancel-request"] });
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
              ...cancelColumns,
              {
                title: "Actions",
                key: "actions",
                width: 250,
                className: "dark:!bg-neutral-900 dark:!text-neutral-200",
                render: (_: any, record: any) => (
                  <Row align={"middle"} justify={"space-around"}>
                    {record.status === "pending" && (
                      <>
                        <Button
                          onClick={() => handleApproveRequest(record.id)}
                          className="!text-white !bg-primary-200"
                          loading={loadingApproveRow === record.id}
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleDenyRequest(record.id)}
                          className="!text-white !bg-primary-200"
                          loading={loadingRow === record.id}
                        >
                          Deny
                        </Button>
                      </>
                    )}
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
