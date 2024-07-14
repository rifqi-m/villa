import { truncate } from "lodash";

export const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
    width: 200,
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
    width: 200,
    render: (record: string) => {
      return <p>{truncate(record, { length: 20 })}</p>;
    },
  },
];