import React from "react";
import { ProCard } from "@ant-design/pro-components";
import { Button } from "antd";
import InstructionItem from "./components/InstructionItem/index";
import { useSetState } from "ahooks";

function Instruction() {
  const [state, setState] = useSetState({
    edit: false,
    list: [
      {
        title: "a",
        instruction: [
          {
            value: 1,
            label: 2,
          },
        ],
      },
    ],
  });
  return (
    <ProCard>
      {state.list.map((item, index) => {
        return (
          <div key={index}>
            <InstructionItem
              title={item.title}
              list={item.instruction}
              edit={state.edit}
              onChange={() => {
                
              }}
            />
          </div>
        );
      })}
      {state.edit ? (
        <Button type="primary">保存</Button>
      ) : (
        <Button
          type="primary"
          onClick={() => {
            setState({
              edit: true,
            });
          }}
        >
          编辑
        </Button>
      )}
    </ProCard>
  );
}

export default Instruction;
