import "bootstrap/dist/css/bootstrap.min.css";
import "./calender.css";
import Calendar from "react-calendar";
import "./calender1.css";
import Todo_list from "./Todo";
import { useEffect } from "react";
export default function Calender() {
  let tododata = Todo_list.map((item) => {
    return item;
  });
  //   console.log(tododata);
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
      let uptodo1 = document.getElementById("uptodolist1");
      let uptodo2 = document.getElementById("uptodolist2");
      if (curr_id === selected_date) {
        todo1.innerText = tododata[i].task1;
        todo2.innerText = tododata[i].task2;
        try {
          uptodo1.innerText = tododata[i + 1].task1;
          uptodo2.innerText = tododata[i + 1].task2;
        } catch (e) {
          uptodo1.innerText = "Looks like there is no upcoming tasks.";
          uptodo2.innerText = "Looks like there is no upcoming tasks.";
        }
        break;
      } else {
        todo1.innerText = "Today is free!!";
        todo2.innerText = "No tasks there";
        uptodo1.innerText = "Looks like there is no upcoming tasks.";
        uptodo2.innerText = "Looks like there is no upcoming tasks.";
      }
    }
  }
  useEffect(() => {
    Default();
  }, []);
  function Day(value) {
    value = String(value);
    const Date = value.split(" ");
    const day = document.getElementById("Day");
    const month = document.getElementById("Month");
    const year = document.getElementById("year");
    day.innerText = Date[2];
    month.innerText = Date[1];
    year.innerText = Date[3];
    for (let i = 0; i < tododata.length; i++) {
      let curr_id = String(tododata[i].id);
      //   console.log(curr_id);
      let selected_date = String(Date[2] + " " + Date[1] + " " + Date[3]);
      //   console.log(selected_date);
      let todo1 = document.getElementById("todolist1");
      let todo2 = document.getElementById("todolist2");
      let uptodo1 = document.getElementById("uptodolist1");
      let uptodo2 = document.getElementById("uptodolist2");
      if (curr_id === selected_date) {
        todo1.innerText = tododata[i].task1;
        todo2.innerText = tododata[i].task2;

        break;
      } else {
        todo1.innerText = "Today is free!!";
        todo2.innerText = "No tasks there";
      }
    }
  }
  return (
    <>
      <div className="row">
        <div className="Frame1 col-lg-5">
          <div className="CurrDate col-sm-12" id="Date">
            <h3 id="Day"></h3>
            <div className="innerdatebox">
              <h4 id="Month"></h4>
              <h4 id="year"></h4>
            </div>
          </div>
          <div className="ToDoList col-sm-12">
            <h3>Today's Deadlines</h3>
            <ul>
              <li id="todolist1"></li>
              <li id="todolist2"></li>
            </ul>
          </div>
          <div className="ToDoList col-sm-12">
            <h3>Upcoming Deadlines</h3>
            <ul>
              <li id="uptodolist1"></li>
              <li id="uptodolist2"></li>
            </ul>
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
