import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { baseAPI } from "../../../../environment";

export default function TeacherDetails() {
  const [teacherDetails, setTeacherDetails] = React.useState(null);

  const teacherDetail = async () => {
    try {
      const response = await axios.get(`${baseAPI}/teacher/fetch-single`);
      setTeacherDetails(response.data.teacher); // Update the state with the response data
      console.log("TEACHER DETAIL", response.data.teacher);
    } catch (error) {
      console.error("Error in Fetching Teacher Details", error.message); // Log error message
    }
  };

  React.useEffect(() => {
    teacherDetail();
  }, []);
  return (
    <>
      {teacherDetails && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Name :</b>
                  </TableCell>
                  <TableCell align="right">{teacherDetails.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Email :</b>
                  </TableCell>
                  <TableCell align="right">{teacherDetails.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Age :</b>
                  </TableCell>
                  <TableCell align="right">{teacherDetails.age}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Gender :</b>
                  </TableCell>
                  <TableCell align="right">{teacherDetails.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Qualification :</b>
                  </TableCell>
                  <TableCell align="right">
                    {teacherDetails.qualification}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
