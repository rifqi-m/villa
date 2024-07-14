import dayjs from "dayjs";

export const columns = [
  {
    title: "Booking Id",
    dataIndex: "booking_id",
    key: "booking_id",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
    width: 100,
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
  },
  {
    title: "Amount",
    dataIndex: "Booking",
    key: "Booking",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
    render: (record: any) => {
      return <p>{record.amount} </p>;
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
  },
  {
    title: "Date",
    dataIndex: "Booking",
    key: "Booking",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
    render: (record: any) => {
      return (
        <p>
          {dayjs(record.start_date).format("YYYY-MM-DD")} to{" "}
          {dayjs(record.end_date).format("YYYY-MM-DD")}{" "}
        </p>
      );
    },
  },
];
