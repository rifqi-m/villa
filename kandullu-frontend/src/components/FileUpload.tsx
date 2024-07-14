import React, { useState } from "react";
import axios from "axios";
import requestManager from "@/configs/requestManager";
import { Button, Col, message, notification, Row } from "antd";
import { displayErrorMessage } from "@/utils/displayErrorMsg";
import { DeleteOutlined } from "@ant-design/icons";
import { map } from "lodash";
type fileType = {
  multiple?: boolean;
  onUploadSuccess: (urls: string[]) => void;
  label: string;
  rest?: any;
  existingFiles?: string[];
  onRemoveFile?: (url: string) => void;
};
const FileUpload = ({
  existingFiles = [],
  onRemoveFile,
  multiple = false,
  onUploadSuccess,
  label,
  rest,
}: fileType) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: any) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async () => {
    if (!files || files.length === 0) {
      notification.error({ message: "No files selected" });
      return;
    }
    const formData = new FormData();

    formData.append("folder", label);

    if (multiple) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    } else {
      formData.append("files", files[0]);
    }
    setLoading(true);

    try {
      const response = await requestManager.post(
        "/file/uploadMedia",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onUploadSuccess(response.data);
      notification.success({ message: "File uploaded" });
    } catch (error) {
      console.log(error);
      displayErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row align={"middle"} justify={"space-between"}>
      <Col span={24}>
        <Row align={"middle"} justify={"space-between"}>
          <input
            type="file"
            multiple={multiple}
            onChange={handleFileChange}
            {...rest}
          />

          <Button
            htmlType="button"
            className="!text-white !bg-primary-200"
            role="button"
            loading={loading}
            onClick={handleSubmit}
          >
            Upload
          </Button>
        </Row>
      </Col>
      <Col span={24}>
        <Row>
          {map(existingFiles, (file, index) => (
            <div key={index} style={{ margin: "10px" }}>
              <img src={file} alt={`file-${index}`} width={100} />
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                onClick={() => onRemoveFile && onRemoveFile(file)}
              >
                Remove
              </Button>
            </div>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default FileUpload;
