/* eslint-disable no-unused-vars */
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function Schedule() {
  const date = new Date();
  const myEventsList = [
    {
      id: 1,
      title: "Subject: History, Teacher: Harry",
      start: new Date(date.setHours(11, 30)),
      end: new Date(date.setHours(14, 30)),
    },
    {
      id: 1,
      title: "Subject: English, Teacher: Fred",
      start: new Date(date.setHours(15, 30)),
      end: new Date(date.setHours(18, 30)),
    },
  ];

  return (
    <>
      <h1>Schedule</h1>
      <Calendar
        defaultView="week"
        // view={["week"]}
        localizer={localizer}
        events={myEventsList}
        step={30}
        timeslots={1}
        min={new Date(1970, 1, 1, 10, 0, 0)}
        startAccessor="start"
        endAccessor="end"
        max={new Date(1970, 1, 1, 17, 0, 0)}
        defaultDate={new Date()}
        showMultiDayTimes
        style={{ height: "100%", width: "100%" }}
      />
    </>
  );
}
