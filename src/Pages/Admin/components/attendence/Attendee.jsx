/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";

export default function Attendee({ classId }) {
  useEffect(() => {
    console.log("CLASS ID:", classId);
  }, [classId]);
  return (
    <>
      <h1>Attendee</h1>
    </>
  );
}
