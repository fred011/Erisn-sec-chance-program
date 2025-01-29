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

  const fetchTeacherDetails = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      console.log("Token:", token); // Log the token

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.get(`${baseAPI}/teacher/fetch-single`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setTeacherDetails(response.data.teacher);
    } catch (error) {
      console.error(
        "Error fetching teacher details:",
        error.response?.data || error.message
      );
    }
  };

  React.useEffect(() => {
    fetchTeacherDetails();
  }, []);

  if (!teacherDetails) return <div>Loading...</div>;

  return (
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}
