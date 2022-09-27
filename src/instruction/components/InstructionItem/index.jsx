import React, {useEffect} from "react";
import { Button, Input } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useSetState } from "ahooks";
function InstructionItem({ list, edit, title, onChange }) {
  const [state, setState] = useSetState({
    instructionList: list,
  });
  useEffect(() => {
    // 把空的过滤掉
    // const newList = state.instructionList.filter(item => item.value && item.label)
    onChange(state.instructionList, title)
  }, [state.instructionList])

  useEffect(() => {
    console.log('%cindex.jsx line:14 state.instructionList', 'color: #007acc;', state.instructionList);
  }, [state.instructionList])
  return (
    <div>
      <div>{title}</div>
      <div>
        {state.instructionList.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 300,
                  marginRight: 16,
                  height: 32,
                  lineHeight: "32px",
                }}
              >
                {edit ? (
                  <Input value={item.label} placeholder="小标题" />
                ) : (
                  "小标题：" + item.label
                )}
              </div>
              <div
                style={{
                  width: 500,
                  marginRight: 16,
                  height: 32,
                  lineHeight: "32px",
                }}
              >
                {edit ? (
                  <Input value={item.value} placeholder="详细说明" />
                ) : (
                  "详细说明：" + item.value
                )}
              </div>

              {index !== 0 && (
                <DeleteOutlined
                  onClick={() => {
                    console.log(index);
                    state.instructionList.splice(index, 1);
                    setState({
                      instructionList: state.instructionList.map((item) => ({
                        ...item,
                      })),
                    });
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      {edit && (
        <Button
          type="link"
          onClick={() => {
            state.instructionList.push({
              value: 1,
              label: 2,
            });
            console.log(state.instructionList);
            setState({
              instructionList: [...state.instructionList],
            });
          }}
        >
          <PlusOutlined />
          添加一条
        </Button>
      )}
    </div>
  );
}

export default InstructionItem;
