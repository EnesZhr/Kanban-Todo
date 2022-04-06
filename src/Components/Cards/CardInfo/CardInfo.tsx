import React, { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
} from "react-feather";
import Chips from "../../Chips/Chips";
import Editable from "../../Editable/Editable";
import Modals from "../../Modal/Modals";

import "./CardInfo.css";

function CardInfo(props: any) {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  const [activeColor, setActiveColor] = useState("");

  const { title, labels, desc, date, tasks } = props.card;

  const [values, setValues] = useState({ ...props.card });

  const calculatePercent = () => {
    if (values.tasks?.length == 0) return "0";
    const completed = values.tasks?.filter(
      (item: any) => item.completed
    )?.length;

    return (completed / values.tasks?.length) * 100 + "";
  };

  const addLabel = (value: any, color: any) => {
    const index = values.labels?.findIndex((item: any) => item.text === value);
    if (index > -1) return;
    const label = {
      text: value,
      color,
    };
    setValues({ ...values, labels: [...values.labels, label] });
    setActiveColor("");
  };

  const removeLabel = (text: any) => {
    const tempLabels = values.labels?.filter((item: any) => item.text !== text);

    setValues({ ...values, labels: tempLabels });
  };

  const addTask = (value: any) => {
    const task = {
      id: Date.now() + Math.random(),
      text: value,
      completed: false,
    };

    setValues({ ...values, tasks: [...values.tasks, task] });
  };

  const removeTask = (id: any) => {
    const index = values.tasks?.findIndex((item: any) => item.id === id);
    if (index < 0) return;

    const tempTasks = values.tasks?.splice(index, 1);
    setValues({ ...values, tasks: tempTasks });
  };

  const updateTask = (id: any, completed: any) => {
    const index = values.tasks?.findIndex((item: any) => item.id === id);
    if (index < 0) return;

    const tempTasks = [...values.tasks];
    tempTasks[index].completed = completed;
    setValues({ ...values, tasks: tempTasks });
  };

  useEffect(() => {
    if (
      values.title === props.card?.title &&
      values.date === props.card?.date &&
      values.desc === props.card?.desc &&
      values.labels?.length === props.card.labels?.length &&
      values.tasks?.length === props.card?.tasks?.length
    )
      return;

    props.updateCard(props.card.id, props.boardId, values);
  }, [values]);

  return (
    <Modals onClose={() => props.onClose()}>
      <div className="card-info">
        <div className="card-info_box">
          <div className="card-info_box_title">
            <Type />
            Title no 1
          </div>
          <div className="card-info_box_body">
            <Editable
              text={values.title}
              default={values.title}
              placeholder="Enter Title"
              buttonText="Set title"
              onSubmit={(value: any) => setValues({ ...values, title: value })}
            />
          </div>
        </div>
        <div className="card-info_box">
          <div className="card-info_box_title">
            <List />
            Description
          </div>
          <div className="card-info_box_body">
            <Editable
              text={values.desc}
              default={values.desc}
              placeholder="Enter Description"
              buttonText="Add description"
              onSubmit={(value: any) => setValues({ ...values, desc: value })}
            />
          </div>
        </div>
        <div className="card-info_box">
          <div className="card-info_box_title">
            <Calendar />
            Date
          </div>
          <div className="card-info_box_body">
            <input
              type="date"
              defaultValue={
                values.date ? new Date(date).toISOString().split("T")[0] : ""
              }
              onChange={(event: any) =>
                setValues({ ...values, date: event.target.value })
              }
            />
          </div>
        </div>
        <div className="card-info_box">
          <div className="card-info_box_title">
            <Tag />
            Labels
          </div>
          <div className="card-info_box_labels">
            {values.labels?.map((item: any, index: any) => (
              <Chips
                close
                onClose={() => removeLabel(item.text)}
                key={item.text + index}
                color={item.color}
                text={item.text}
              />
            ))}
          </div>
          <div className="card-info_box_colors">
            {colors.map((item: any, index: any) => (
              <li
                key={index}
                style={{ backgroundColor: item }}
                className={item === activeColor ? "active" : ""}
                onClick={() => setActiveColor(item)}
              />
            ))}
          </div>
          <div className="card-info_box_body">
            <Editable
              text="Add Label"
              placeholder="Enter Label"
              buttonText="Add"
              onSubmit={(value: any) => addLabel(value, activeColor)}
            />
          </div>
        </div>
        <div className="card-info_box">
          <div className="card-info_box_title">
            <CheckSquare />
            Tasks
          </div>
          <div className="card-info_box_progress_bar">
            <div
              className={`card-info_box_progress`}
              style={{
                width: calculatePercent() + "%",
                backgroundColor:
                  calculatePercent() === "100" ? "limegreen" : "",
              }}
            ></div>
          </div>
          <div className="card-info_box_list">
            {values.tasks?.map((item: any) => (
              <div key={item.id} className="card-info_task">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event: any) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p>{item.text}</p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <div className="card-info_box_body">
            <Editable
              text="Add new task"
              placeholder="Enter Task"
              buttonText="Add Task"
              onSubmit={(value: any) => addTask(value)}
            />
          </div>
        </div>
      </div>
    </Modals>
  );
}

export default CardInfo;
