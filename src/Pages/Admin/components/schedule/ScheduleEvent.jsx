/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseAPI } from "../../../../environment";

const ScheduleEvent = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [values, setValues] = useState({
    teacher: "",
    subject: "",
    class: "",
    startTime: "14:00",
    endTime: "15:00",
    date: new Date(),
  });

  // Fetch teachers, subjects, and classes when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const teachersResponse = await axios.get("$baseAPI{/teachers");
        const subjectsResponse = await axios.get("$baseAPI{/subjects");
        const classesResponse = await axios.get("$baseAPI{/classes");

        setTeachers(teachersResponse.data);
        setSubjects(subjectsResponse.data);
        setClasses(classesResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      teacher,
      subject,
      class: selectedClass,
      startTime,
      endTime,
      date,
    } = values;

    // Convert start and end time to ISO format
    const startTimeStr = new Date(
      date.setHours(
        parseInt(startTime.split(":")[0], 10),
        parseInt(startTime.split(":")[1], 10),
        0
      )
    ).toISOString();

    const endTimeStr = new Date(
      date.setHours(
        parseInt(endTime.split(":")[0], 10),
        parseInt(endTime.split(":")[1], 10),
        0
      )
    ).toISOString();

    const payload = {
      teacher,
      subject,
      class: selectedClass,
      startTime: startTimeStr,
      endTime: endTimeStr,
    };

    try {
      const response = await axios.post(`${baseAPI}/schedules`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Schedule created successfully", response.data);
    } catch (error) {
      console.error("Error creating schedule", error.response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Teacher</label>
        <select
          name="teacher"
          value={values.teacher}
          onChange={(e) => setValues({ ...values, teacher: e.target.value })}
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Subject</label>
        <select
          name="subject"
          value={values.subject}
          onChange={(e) => setValues({ ...values, subject: e.target.value })}
        >
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject._id} value={subject._id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Class</label>
        <select
          name="class"
          value={values.class}
          onChange={(e) => setValues({ ...values, class: e.target.value })}
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Start Time</label>
        <input
          type="time"
          name="startTime"
          value={values.startTime}
          onChange={(e) => setValues({ ...values, startTime: e.target.value })}
        />
      </div>

      <div>
        <label>End Time</label>
        <input
          type="time"
          name="endTime"
          value={values.endTime}
          onChange={(e) => setValues({ ...values, endTime: e.target.value })}
        />
      </div>

      <button type="submit">Create Schedule</button>
    </form>
  );
};

export default ScheduleEvent;
