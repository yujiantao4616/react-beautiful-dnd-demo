import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { grid } from "../constants";
import { Input, Button } from "antd";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";

const DishesTypeTitle = ({ title, edit, ...props }) => {
  return (
    <div
      style={{
        padding: grid,
        transition: "background-color ease 0.2s",
        flexGrow: 1,
        userSelect: "none",
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      {...props}
    >
      <div>
        {edit ? (
          <>
            <Input
              value={title}
              style={{
                width: 250,
              }}
            />
            <Button>编辑</Button>
          </>
        ) : (
          title
        )}
      </div>
      {edit && (
        <CloseOutlined
          style={{
            fontSize: 18,
            cursor: "pointer",
          }}
          onClick={() => {
            console.log("click");
          }}
        />
      )}
    </div>
  );
};

export default DishesTypeTitle;
