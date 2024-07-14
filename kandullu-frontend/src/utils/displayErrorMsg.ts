import { notification } from "antd";
import { isArray, isObject, truncate } from "lodash";

export const displayErrorMessage = (err: any) => {
  const error = err.response?.data;

  if (error && ((isArray(error) && error.length > 0) || isObject(error))) {
    if (isArray(error)) {
      return error.map((err: string) =>
        notification.error({ message: "", description: err })
      );
    }
    if (!isArray(error) && !isObject(error)) {
      return notification.error({
        message: "",
        description: truncate(error, { length: 200 }),
      });
    }
    if (isObject(error)) {
      const keys = Object.keys(error);
      keys.map((item: string) => {
        //@ts-expect-error
        if (Array.isArray(error[item]) && error[item]?.length > 0) {
          //@ts-expect-error
          return error[item]?.map((item: any) =>
            notification.error({
              message: item.field,
              description: item.message,
            })
          );
        }
        //@ts-expect-error
        return notification.error({ message: "", description: error[item] });
      });
    }
  } else {
    return notification.error({
      message: "",
      description: err.response?.data?.message || err.message,
    });
  }
};
