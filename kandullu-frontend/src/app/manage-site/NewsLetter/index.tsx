import { DeleteOutlined } from "@ant-design/icons";
import { Card, Row, Col, Button, Table, notification } from "antd";
import { columns as newsLetterColumns } from "./columns";
import React, { useState } from "react";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { queryClient } from "@/configs/queryClient";
import { useGetNewsLetter, useDeleteNewsLetter } from "./queries";

type Props = {};

const NewsLetter = (props: Props) => {
  const { data, isLoading } = useGetNewsLetter();
  const { mutate: deleteNewsLetter, isPending: isDeleteLoading } =
    useDeleteNewsLetter();
  const [loadingRow, setLoadingRow] = useState<string | null>(null);
  const handleDeleteNewsLetter = (id: any) => {
    setLoadingRow(id);

    deleteNewsLetter(id, {
      onError: (error) => {
        setLoadingRow(null);
        // Handle the error
        displayErrorMessage(error);
      },
      onSuccess: (data) => {
        setLoadingRow(null);
        notification.success({
          message: "Success",
          description: "NewsLetter deleted successfully!",
        });
        queryClient.invalidateQueries({ queryKey: ["newsletter"] });
      },
    });
  };
  return (
    <Card className="dark:bg-neutral-900 dark:text-white">
      <Row>
        <Col span={24}>
          <Table
            rowKey={"id"}
            rowClassName={"dark:bg-neutral-900 dark:text-neutral-200"}
            loading={isLoading}
            dataSource={data}
            columns={[
              ...newsLetterColumns,
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
                      onClick={() => handleDeleteNewsLetter(record.id)}
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
    </Card>
  );
};

export default NewsLetter;
