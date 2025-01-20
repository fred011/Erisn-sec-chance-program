/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ScheduleEvent from "./ScheduleEvent";

import axios from "axios";
import { baseAPI } from "../../../../environment";

const localizer = momentLocalizer(moment);

export default function Schedule() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const [newPeriod, setNewPeriod] = useState(false);
  const date = new Date();
  const myEventsList = [
    {
      id: 1,
      title: "Subject: History, Teacher: Harry",
      start: new Date(date.setHours(9, 30)),
      end: new Date(date.setHours(11, 30)),
    },
  ];

  const handleEventClose = () => {
    setNewPeriod(false);
  };

  useEffect(() => {
    axios
      .get(`${baseAPI}/class/all`)
      .then((res) => {
        setClasses(res.data.data);
        setSelectedClass(res.data.data[0]._id);
        console.log("Fetched classes : ", res.data.data);
        console.log("Selected class : ", res.data.data[0]._id);
      })
      .catch((e) => {
        console.log("Fetch class error", e);
      });
  }, []);

  return (
    <>
      <h2 style={{ marginBottom: "4px" }}>Schedule</h2>
      <Typography variant="h5" sx={{ fontWeight: "500" }}>
        Class
      </Typography>
      <FormControl fullWidth>
        <Select
          // labelId="classes"
          // id="classes"
          value={selectedClass || ""}
          // label="Class"
          onChange={(e) => {
            setSelectedClass(e.target.value);
          }}
        >
          {/* <MenuItem value={""}>Select Class</MenuItem> */}
          {classes &&
            classes.map((x) => {
              return (
                <MenuItem key={x._id} value={x._id}>
                  {x.class_text}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>

      <Button onClick={() => setNewPeriod(true)}>Add new Period</Button>
      {newPeriod && (
        <ScheduleEvent
          selectedClass={selectedClass}
          handleEventClose={handleEventClose}
        />
      )}

      <Calendar
        defaultView="week"
        // view={["week", "day", "agenda"]}
        localizer={localizer}
        events={myEventsList}
        step={30}
        timeslots={1}
        min={new Date(1970, 1, 1, 7, 0, 0)}
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
