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
      start: date.setHours(11, 30),
      end: date.setHours(14, 30),
    },
    {
      id: 1,
      title: "Subject: English, Teacher: Fred",
      start: date.setHours(15, 30),
      end: date.setHours(18, 30),
    },
  ];

  return (
    <>
      <h1>Schedule</h1>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </>
  );
}
