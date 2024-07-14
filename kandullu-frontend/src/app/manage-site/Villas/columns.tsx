import { truncate } from "lodash";

export const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
  },

  {
    title: "About",
    dataIndex: "about",
    key: "about",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",

    render: (record: string) => {
      return <p>{truncate(record, { length: 20 })}</p>;
    },
  },
  {
    title: "Baths",
    dataIndex: "baths",
    key: "baths",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
  },
  {
    title: "Beds",
    dataIndex: "beds",
    key: "beds",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
  },
  {
    title: "Max Guest",
    dataIndex: "max_guest",
    key: "max_guest",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
  },
  {
    title: "Summary",
    dataIndex: "summary",
    key: "summary",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",

    render: (record: string) => {
      return <p>{truncate(record, { length: 20 })}</p>;
    },
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",

    render: (record: string) => {
      return <p>{truncate(record, { length: 20 })}</p>;
    },
  },
];
