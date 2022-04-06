import Board from "./Components/Boards/Board";
import Editable from "./Components/Editable/Editable";

import "./App.css";
import { useState } from "react";
function App() {
  const [boards, setBoards] = useState<any>([]);
  const [target, setTarget] = useState({
    cid: "",
    bid: "",
  });

  const addCard = (title: any, bid: any) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };

    const index = boards.findIndex((item: any) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };

  const removeCard = (cid: any, bid: any) => {
    const bIndex = boards.findIndex((item: any) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex(
      (item: any) => item.id === cid
    );
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
  };

  const addBoard = (title: any) => {
    setBoards([
      ...boards,
      {
        id: Date.now() + Math.random(),
        title,
        cards: [],
      },
    ]);
  };

  const removeBoard = (bid: any) => {
    const tempBoards = boards.filter((item: any) => item.id !== bid);

    setBoards(tempBoards);
  };

  const handleDragEnd = (cid: any, bid: any) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex;

    s_bIndex = boards.findIndex((item: any) => item.id === bid);
    if (s_bIndex < 0) return;

    s_cIndex = boards[s_bIndex].cards?.findIndex(
      (item: any) => item.id === cid
    );
    if (s_cIndex < 0) return;

    t_bIndex = boards.findIndex((item: any) => item.id === target.bid);
    if (t_bIndex < 0) return;

    t_cIndex = boards[t_bIndex].cards?.findIndex(
      (item: any) => item.id === target.cid
    );
    if (t_cIndex < 0) return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[s_bIndex].cards[s_cIndex];

    tempBoards[s_bIndex].cards.splice(s_cIndex, 1);
    tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);

    setBoards(tempBoards);
  };

  const handleDragEnter = (cid: any, bid: any) => {
    setTarget({
      cid,
      bid,
    });
  };

  const updateCard = (cid: any, bid: any, card: any) => {
    const bIndex = boards.findIndex((item: any) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex(
      (item: any) => item.id === cid
    );
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards[cIndex] = card;
    setBoards(tempBoards);
  };
  return (
    <div className="app">
      <div className="app_navbar">
        <h2>Kanban</h2>
      </div>

      <div className="app_outer">
        <div className="app_boards">
          {boards.map((item: any) => (
            <Board
              key={item.id}
              board={item}
              removeBoard={removeBoard}
              addCard={addCard}
              removeCard={removeCard}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
              updateCard={updateCard}
            />
          ))}
          <div className="app_boards_board">
            <Editable
              displayClass="app_boards_board_add"
              text="Add Board"
              placeholder="Enter board title"
              onSubmit={(value: any) => addBoard(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
