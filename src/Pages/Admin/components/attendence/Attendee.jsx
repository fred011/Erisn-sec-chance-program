/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";

export default function Attendee({ classId }) {
  useEffect(() => {
    console.log("CLASS ID:", classId);
  }, []);
  return <h1>Attendee</h1>;
}
