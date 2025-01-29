import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { baseAPI } from "../../../../environment";
import { AuthContext } from "../../../AuthPages/AuthContext";

export default function TeacherDetails() {
  const { auth } = React.useContext(AuthContext);
  const token = auth?.token; // Get token from context instead
  console.log("Token from context:", token);
  const [teacherDetails, setTeacherDetails] = React.useState(null);

  const fetchTeacherDetails = async () => {
    try {
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
