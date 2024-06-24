import "bootstrap/dist/css/bootstrap.min.css";
import "./calender.css";
import Calendar from "react-calendar";
import "./calender1.css";
// import Todo_list from "./Todo";
import { useEffect, useState } from "react";
import React from "react";

export default function Calender() {
  let [updatedlist, setupdatedlists] = React.useState();
  let [upcominglist, setupcominglist] = React.useState();
  const [name, setName] = React.useState("");

  const [, forceRender] = useState(undefined);

  const handleClick = () => {
    forceRender((prev) => !prev);
  };
  // localStorage.clear();
  const storedData = localStorage.getItem("tododata");
  function DataCheck() {
    if (!storedData) {
      // console.log("yes its ");

      const dataArray = [
        {
          id: "06 Jun 2024",
          tasks: [" My exams start", " I should be consious about it"],
        },
        {
          id: "16 Jun 2024",
          tasks: [" My holidays start here", " I should be productive again"],
        },
        {
          id: "23 Jun 2024",
          tasks: [
            " I should do my relevent project works",
            " I should be productive",
          ],
        },
        {
          id: "24 Jun 2024",
          tasks: [
            " I should do my relevent project works again",
            " I should be productive again",
          ],
        },
      ];
      localStorage.setItem("tododata", JSON.stringify(dataArray));
      window.location.reload();
    }
  }

  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem("tododata")) || [];
  });
  let tododata = data.map((item) => {
    return item;
  });
  // console.log(tododata);
  let daysinlist = [];
  for (let i = 0; i < tododata.length; i++) {
    daysinlist.push(tododata[i].id);
  }
  //   console.log(daysinlist);

  function Default() {
    let today = new Date();
    today = String(today);
    today = today.split(" ");
    const day = document.getElementById("Day");
    const month = document.getElementById("Month");
    const year = document.getElementById("year");
    day.innerText = today[2];
    month.innerText = today[1];
    year.innerText = today[3];
    for (let i = 0; i < tododata.length; i++) {
      let curr_id = String(tododata[i].id);
      //   console.log(curr_id);
      let selected_date = String(today[2] + " " + today[1] + " " + today[3]);
      //   console.log(selected_date);
      let todo1 = document.getElementById("todolist1");
      let todo2 = document.getElementById("todolist2");
      if (curr_id === selected_date) {
        const updatedlist1 = tododata[i].tasks.map((curr_task) => {
          return <li>{curr_task}</li>;
        });
        setupdatedlists(updatedlist1);
        break;
      } else {
        // console.log("yes");
        const nonupdateditem = <li>Today is free!!</li>;

        setupdatedlists(nonupdateditem);
      }
    }

    // console.log("yes");
    let upcominglist1 = [];
    for (let j = 0; j < tododata.length; j++) {
      let curr_date = String(tododata[j].id).split(" ");
      // console.log(curr_date);
      if (new Date(curr_date) > new Date()) {
        // console.log("success");
        // console.log(tododata[j]);
        upcominglist1.push(
          tododata[j].tasks.map((curr_task) => {
            return (
              <li>
                {tododata[j].id + ":  "} {curr_task}
              </li>
            );
          })
        );
      }
      setupcominglist(upcominglist1);
    }
  }
  useEffect(() => {
    DataCheck();
    Refresh();
    Default();
  }, []);
  // useEffect(() => {
  //   DataCheck();
  // }, []);

  function Day(value) {
    value = String(value);
    let hiddenspan = document.getElementById("hiddenspan");
    hiddenspan.innerText = value;
    const Date = value.split(" ");
    const day = document.getElementById("Day");
    const month = document.getElementById("Month");
    const year = document.getElementById("year");
    day.innerText = Date[2];
    month.innerText = Date[1];
    year.innerText = Date[3];
    let verifies = false;
    for (let i = 0; i < tododata.length; i++) {
      let curr_id = String(tododata[i].id);
      //   console.log(curr_id);
      let selected_date = String(Date[2] + " " + Date[1] + " " + Date[3]);
      //   console.log(selected_date);
      // let todo1 = document.getElementById("todolist1");
      // let todo2 = document.getElementById("todolist2");
      // let uptodo1 = document.getElementById("uptodolist1");
      // let uptodo2 = document.getElementById("uptodolist2");

      if (curr_id === selected_date) {
        // console.log(true);
        verifies = true;
        // console.log("yes");
        let initial = 0;
        let updatedlist2 = tododata[i].tasks.map((curr_task) => {
          initial = initial + 1;
          let classNam = "task" + initial;
          let delclassname = "btn btn-primary " + `${classNam}`;
          const removeElementsByClassName = (className) => {
            // console.log(className);
            // console.log(updatedlist2);
            // for (let i = 0; i < updatedlist2.length; i++) {
            //   console.log(updatedlist2[i].props.className);
            updatedlist2 = updatedlist2.filter(
              (element) => element.props.className !== className
            );
            setupdatedlists(updatedlist2);
            // console.log(updatedlist2);
            for (let k = 0; k < updatedlist2.length; k++) {
              // console.log("success");
              tododata[i].tasks = [];
              tododata[i].tasks[k] = updatedlist2[k].props.children[0];
            }
            if (updatedlist2.length === 0) {
              tododata[i].tasks = [];
              Refresh();
              localStorage.setItem("tododata", JSON.stringify(tododata));
              window.location.reload();
            }

            // console.log(tododata);
            localStorage.setItem("tododata", JSON.stringify(tododata));
            //   }
          };
          return (
            <li className={classNam}>
              {curr_task}
              <button
                className={delclassname}
                id="delete-btn"
                onClick={() => removeElementsByClassName(classNam)}
              >
                Delete
              </button>
            </li>
          );
        });
        setupdatedlists(updatedlist2);
        // console.log(updatedlist);
        break;
      } else {
        const noitem = <li>Today is free!!</li>;
        setupdatedlists(noitem);
      }
    }
    if (!verifies) {
      const nonupdateditem = <li>Today is free!!</li>;

      setupdatedlists(nonupdateditem);
    }
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  function Addtasks() {
    document.getElementById("curr_input").value = "";
    let hiddenspan = document.getElementById("hiddenspan");
    let value = hiddenspan.innerText;
    let Date = value.split(" ");
    // console.log(updatedlist);
    let verify = false;
    for (let i = 0; i < tododata.length; i++) {
      let curr_dat = String(tododata[i].id).split(" ");
      // console.log(curr_dat);
      // console.log(Date);
      if (
        Date[2] === curr_dat[0] &&
        Date[1] === curr_dat[1] &&
        Date[3] === curr_dat[2]
      ) {
        // console.log("yes");
        // console.log(name);
        verify = true;
        tododata[i].tasks.push(name);
        // console.log(tododata);
        Day(value);
        localStorage.setItem("tododata", JSON.stringify(tododata));
      }
    }
    if (!verify) {
      let id = Date[2] + " " + Date[1] + " " + Date[3];
      tododata.push({ id, tasks: [name] });
      // console.log(tododata);
      // const newdata=<li>{name}</li>
      Day(value);
      localStorage.setItem("tododata", JSON.stringify(tododata));

      window.location.reload();
    }
    setName("");
  }
  function Refresh() {
    for (let i = 0; i < tododata.length; i++) {
      if (tododata[i].tasks.length === 0) {
        tododata.splice(i, 1);
      }
    }

    tododata.sort((a, b) => new Date(a.id) - new Date(b.id));
    localStorage.setItem("tododata", JSON.stringify(tododata));
    // window.location.reload();
  }
  return (
    <>
      <div className="row body">
        <div className="Frame1 col-lg-5">
          <div className="CurrDate col-sm-12" id="Date">
            <h3 id="Day"></h3>
            <div className="innerdatebox">
              <h4 id="Month"></h4>
              <h4 id="year"></h4>
            </div>
          </div>
          <div className="ToDoList todolist1 col-sm-12">
            <h3>Today's Deadlines</h3>
            <span id="hiddenspan"></span>
            <ul>{updatedlist}</ul>
            <input
              type="text"
              id="curr_input"
              onChange={handleChange}
              className=""
            />
            <button
              type="button"
              onClick={Addtasks}
              id="edit"
              className="btn btn-primary"
            >
              Add tasks
            </button>
          </div>
          <div className="ToDoList col-sm-12">
            <h3>Upcoming Deadlines</h3>
            <ul>{upcominglist}</ul>
          </div>
        </div>
        <div className="Frame2 col-lg-7">
          <Calendar
            onClickDay={Day}
            className="calender"
            tileClassName={({ date, view }) => {
              date = String(date);
              let indate = date.split(" ");
              // console.log(daysinlist);
              if (
                daysinlist.includes(
                  indate[2] + " " + indate[1] + " " + indate[3]
                )
              ) {
                return "react-calendar__tile--highlight";
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
