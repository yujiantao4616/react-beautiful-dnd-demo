import React, { Component } from "react";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { grid, borderRadius } from "./constants";
import { Draggable } from "react-beautiful-dnd";
import QuoteList from "./primatives/quote-list";
import DishesTypeTitle from "./primatives/title";
import { ProCard } from "@ant-design/pro-components";
import { Input , Button} from 'antd'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
    isDragging ? colors.G50 : colors.N30};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${colors.G50};
  }
`;

const Column = ({ title, quotes, index, isScrollable, isCombineEnabled, edit }) => {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <ProCard ref={provided.innerRef} {...provided.draggableProps} >
          <Header isDragging={snapshot.isDragging}>
            <DishesTypeTitle title={title} isDragging={snapshot.isDragging} {...provided.dragHandleProps} draggable={edit} edit={edit}/>
          </Header>
          <QuoteList
            listId={title}
            listType="QUOTE"
            style={{
              backgroundColor: snapshot.isDragging ? colors.G50 : null,
              width: "100%"
            }}
            quotes={quotes}
            internalScroll={isScrollable}
            isCombineEnabled={Boolean(isCombineEnabled)}
          />
          <Button size='large'>新增菜品</Button>
        </ProCard>
      )}
    </Draggable>
  );
};

export default Column
