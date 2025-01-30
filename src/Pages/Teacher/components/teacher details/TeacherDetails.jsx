import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { baseAPI } from "../../../../environment";
import { AuthContext } from "../../../AuthPages/AuthContext";

export default function TeacherDetails() {
  const { auth } = React.useContext(AuthContext);
  const token = auth?.token;
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

  if (!teacherDetails) return <Typography variant="h6">Loading...</Typography>;

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography
          variant="h4"
          sx={{ color: "#1976d2" }}
          fontWeight={600}
          align="center"
          gutterBottom
        >
          Welcome, {teacherDetails.name}!
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableBody>
              {[
                ["Name", teacherDetails.name],
                ["Email", teacherDetails.email],
                ["Age", teacherDetails.age],
                ["Gender", teacherDetails.gender],
                ["Qualification", teacherDetails.qualification],
              ].map(([label, value], index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>{label}:</TableCell>
                  <TableCell align="right">{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
