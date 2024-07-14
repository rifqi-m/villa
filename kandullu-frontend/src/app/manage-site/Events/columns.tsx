import { truncate } from "lodash";

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
    width: 200,
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
    width: 200,
  },
  {
    title: "Path",
    dataIndex: "href",
    key: "href",
    className: "dark:!bg-neutral-900 dark:!text-neutral-200",
    width: 200,
  },
];
