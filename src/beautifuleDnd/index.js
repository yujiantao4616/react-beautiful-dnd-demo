import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";
import { colors } from "@atlaskit/theme";
import Column from "./column";
import reorder, { reorderQuoteMap } from "./reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { authorQuoteMap } from "./data";
import { Button } from "antd";
import { ProCard } from "@ant-design/pro-components";
import { useSetState } from "ahooks";
import "./styles.css";

const DishesType = ({ edit, ordered, columns }) => (
  <Droppable
    droppableId="board"
    type="COLUMN"
    direction="vertical"
    ignoreContainerClipping={false}
    isCombineEnabled={false}
  >
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {ordered.map((key, index) => (
          <Column
            key={key}
            index={index}
            title={key}
            quotes={columns[key]}
            isScrollable={false}
            isCombineEnabled={false}
            edit={edit}
          />
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

const Board = ({ initial }) => {
  /* eslint-disable react/sort-comp */
  const [state, setState] = useSetState({
    columns: initial,
    ordered: Object.keys(initial),
    edit: false,
  });

  const onDragEnd = (result) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...state.ordered];
        shallow.splice(result.source.index, 1);
        setState({ ordered: shallow });
        return;
      }

      const column = state.columns[result.source.droppableId];
      const withQuoteRemoved = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      const columns = {
        ...state.columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      setState({ columns });
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const ordered = reorder(state.ordered, source.index, destination.index);

      setState({
        ordered,
      });

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: state.columns,
      source,
      destination,
    });

    setState({
      columns: data.quoteMap,
    });
  };

  const columns = state.columns;
  const ordered = state.ordered;

  return (
    <React.Fragment>
      <ProCard style={{
        textAlign:'right'
      }}>
        <Button>添加分类</Button>
        {!state.edit ? (
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
        ) : (
          <Button
            type="primary"
            onClick={() => {
              setState({
                edit: false,
              });
            }}
          >
            保存
          </Button>
        )}
      </ProCard>
      <DragDropContext onDragEnd={onDragEnd}>
        <DishesType edit={state.edit} ordered={ordered} columns={columns} />
      </DragDropContext>
    </React.Fragment>
  );
};

export default Board


