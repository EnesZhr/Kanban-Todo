import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Cards from "../Cards/Cards";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editable/Editable";

import "./Board.css";

function Board(props: any) {
  const [showDropDown, setShowDropDown] = useState<Boolean>(false);

  return (
    <div className="board">
      <div className="board_top">
        <p className="board_top_title">
          {props.board?.title} <span> {`${props.board?.cards?.length}`}</span>
        </p>
        <div className="board_top_more" onClick={() => setShowDropDown(true)}>
          <MoreHorizontal />
          {showDropDown && (
            <Dropdown onClose={() => setShowDropDown(false)}>
              <div className="board_dropdown">
                <p onClick={() => props.removeBoard(props.board?.id)}>
                  Delete Board
                </p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item: any) => (
          <Cards
            key={item.id}
            card={item}
            removeCard={props.removeCard}
            boardId={props.board?.id}
            handleDragEnd={props.handleDragEnd}
            handleDragEnter={props.handleDragEnter}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          displayClass="board_cards_add"
          text="Add a Card"
          placeholder="Card Title"
          onSubmit={(value: any) => props.addCard(value, props.board?.id)}
        />
      </div>
    </div>
  );
}

export default Board;
