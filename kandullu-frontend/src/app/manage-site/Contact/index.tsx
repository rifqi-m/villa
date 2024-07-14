import { DeleteOutlined } from "@ant-design/icons";
import { Card, Row, Col, Button, Table, notification } from "antd";
import { columns as contactColumns } from "./columns";
import React, { useState } from "react";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { queryClient } from "@/configs/queryClient";
import { useGetContact, useDeleteContact } from "./queries";

type Props = {};

const Contact = (props: Props) => {
  const { data, isLoading } = useGetContact();
  const { mutate: deleteContact, isPending: isDeleteLoading } =
    useDeleteContact();
  const [loadingRow, setLoadingRow] = useState<string | null>(null);

  const handleDeleteContact = (id: any) => {
    setLoadingRow(id);

    deleteContact(id, {
      onError: (error) => {
        setLoadingRow(null);
        // Handle the error
        displayErrorMessage(error);
      },
      onSuccess: (data) => {
        setLoadingRow(null);
        notification.success({
          message: "Success",
          description: "Contact deleted successfully!",
        });
        queryClient.invalidateQueries({ queryKey: ["contact-us"] });
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
              ...contactColumns,
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
                      onClick={() => handleDeleteContact(record.id)}
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

export default Contact;
