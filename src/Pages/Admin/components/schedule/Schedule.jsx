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
  const [events, setEvents] = useState(myEventsList);

  const handleEventClose = () => {
    setNewPeriod(false);
    setEdit(false);
  };

  const [edit, setEdit] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const handleSelectEvent = (event) => {
    setEdit(true);
    setSelectedEventId(event.id);
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

  const fetchSchedule = (selectedClass) => {
    if (selectedClass) {
      console.log("Fetching schedules for class:", selectedClass);

      axios
        .get(`${baseAPI}/schedule/fetch-with-class/${selectedClass}`)
        .then((res) => {
          console.log("API Response:", res.data);

          if (res.data.data.length === 0) {
            console.log("No schedules found:");

            setEvents([]); // Clear events if no schedules
          } else {
            const resData = res.data.data.map((x) => {
              return {
                id: x._id,
                title: `Subject: ${x.subject.subject_name} , Teacher:${x.teacher.name}`,
                start: new Date(x.startTime),
                end: new Date(x.endTime),
              };
            });
            setEvents(resData); // Update with retrieved schedules
          }
        })
        .catch((err) => {
          console.log(
            "Error in fetching schedule: ",
            err.response?.data || err
          );
        });
    }
  };

  useEffect(() => {
    fetchSchedule(selectedClass);
  }, [selectedClass]);

  const fetchEvents = async (selectedClass) => {
    try {
      const res = await axios.get(
        `${baseAPI}/schedule/fetch-with-class/${selectedClass}`
      );
      setEvents(res.data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    if (selectedClass) {
      fetchEvents(selectedClass);
    }
  }, [selectedClass]);
  // Function to handle adding new period
  const handleAddNewPeriod = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]); // Add new event to the state
    setNewPeriod(false); // Close the new period form
  };

  return (
    <>
      <h2 style={{ marginBottom: "4px" }}>Schedule</h2>
      <Typography variant="h5" sx={{ fontWeight: "500" }}>
        Class
      </Typography>
      <FormControl fullWidth>
        <Select
          value={selectedClass || ""}
          onChange={(e) => {
            setSelectedClass(e.target.value);
          }}
        >
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
      {(newPeriod || edit) && (
        <ScheduleEvent
          selectedClass={selectedClass}
          handleEventClose={handleEventClose}
          onAddNewPeriod={handleAddNewPeriod} // Pass the callback function to ScheduleEvent
          edit={edit}
          selectedEventId={selectedEventId}
          refreshEvents={fetchEvents} // Pass this to refresh the events
        />
      )}

      <Calendar
        defaultView="week"
        localizer={localizer}
        events={events}
        step={30}
        timeslots={1}
        min={new Date(1970, 1, 1, 7, 0, 0)}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        max={new Date(1970, 1, 1, 17, 0, 0)}
        defaultDate={new Date()}
        showMultiDayTimes
        style={{ height: "100%", width: "100%" }}
        views={["week", "day", "agenda"]}
      />
    </>
  );
}
