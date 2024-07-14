import dayjs from "dayjs";

export const columns = [
  {
    title: " User Info",
    dataIndex: "User",
    key: "User",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
    render: (record: any) => {
      return (
        <div>
          <p>
            <strong>Name:</strong>
            {record.name}
          </p>
          <p>
            <strong>Email:</strong>
            {record.email}
          </p>
          <p>
            <strong>Number:</strong>
            {record.phoneNumber}
          </p>
        </div>
      );
    },
  },
  {
    title: "Villa",
    dataIndex: "Villa",
    key: "Villa",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
    render: (record: any) => {
      return (
        <div>
          <p>{record.title}</p>
        </div>
      );
    },
  },
  {
    title: " Date",
    dataIndex: "start_date",
    key: "start_date",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
    render: (_: any, record: any) => {
      return (
        <div>
          <p>
            {dayjs(record.start_date).format("YYYY-MM-DD")} to{" "}
            {dayjs(record.end_date).format("YYYY-MM-DD")}
          </p>
        </div>
      );
    },
  },

  {
    title: "Payment Type",
    dataIndex: "payment_type",
    key: "payment_type",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
  },
  {
    title: "Pending amount",
    dataIndex: "pending_amount",
    key: "pending_amount",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
  },
  {
    title: "Paid",
    dataIndex: "is_paid",
    key: "is_paid",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
    render: (record: any) => {
      return (
        <div>
          <p>{record ? "Paid" : "Not Paid"}</p>
        </div>
      );
    },
  },
  {
    title: "Guests",
    dataIndex: "guests",
    key: "guests",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
    render: (record: any) => {
      return (
        <div>
          <p>
            <strong>Child:</strong>
            {record.child}
          </p>
          <p>
            <strong>Adults:</strong>
            {record.adults}
          </p>
          <p>
            <strong>Infants:</strong>
            {record.infants}
          </p>
        </div>
      );
    },
  },
];
