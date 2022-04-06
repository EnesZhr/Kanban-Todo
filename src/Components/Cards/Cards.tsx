import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Chips from "../Chips/Chips";
import Dropdown from "../Dropdown/Dropdown";
import CardInfo from "./CardInfo/CardInfo";

import "./Cards.css";
function Cards(props: any) {
  const [showDropDown, setShowDropDown] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState<Boolean>(false);

  return (
    <>
      {showModal && (
        <CardInfo
          updateCard={props.updateCard}
          boardId={props.boardId}
          card={props.card}
          onClose={() => setShowModal(false)}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
        onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
        onClick={() => setShowModal(true)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {props.card?.labels?.map((item: any, index: any) => (
              <Chips key={index} text={item.text} color={item.color} />
            ))}
          </div>
          <div className="card_top_more" onClick={() => setShowDropDown(true)}>
            <MoreHorizontal />
            {showDropDown && (
              <Dropdown onClose={() => setShowDropDown(false)}>
                <div className="card_dropdown">
                  <p
                    onClick={() =>
                      props.removeCard(props.card?.id, props.boardId)
                    }
                  >
                    Delete Card
                  </p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{props.card?.title}</div>
        <div className="card_footer">
          {props.card?.date && (
            <p>
              <Clock /> {props.card?.date}
            </p>
          )}
          {props.card?.tasks?.length > 0 && (
            <p>
              <CheckSquare />
              {props.card?.tasks?.filter((item: any) => item.completed).length}/
              {props.card?.tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Cards;
