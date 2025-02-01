import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseAPI } from "../../../../environment";
import axios from "axios";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
import CircularIndeterminate from "./CircularIndeterminate"; // Import loader component

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: theme.shadows[3],
}));

const AttendanceDetails = () => {
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const { id: studentId } = useParams();
  const navigate = useNavigate();

  // Utility to convert date into readable format
  const convertDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  const fetchAttendanceData = async () => {
    try {
      // Get the token from localStorage or context
      const token = localStorage.getItem("token"); // Or use context if the token is stored there

      // Include the token in the Authorization header
      const response = await axios.get(`${baseAPI}/attendance/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the headers
        },
      });

      const respData = response.data;

      if (respData) {
        let presentCount = 0;
        let absentCount = 0;

        respData.forEach((attendance) => {
          if (attendance.status === "Present") presentCount++;
          else if (attendance.status === "Absent") absentCount++;
        });

        setAttendanceData(respData);
        setPresent(presentCount);
        setAbsent(absentCount);
      }
    } catch (error) {
      console.error("Error in fetching student attendance:", error);
      navigate("/admin/attendance");
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  if (loading) {
    return <CircularIndeterminate />; // Show loader while loading
  }

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Attendance Details
      </Typography>

      <Grid container spacing={3}>
        {/* Pie Chart */}
        <Grid xs={12} md={6}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Attendance Overview
            </Typography>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: present, label: "Present" },
                    { id: 1, value: absent, label: "Absent" },
                  ],
                },
              ]}
              width={400}
              height={250}
            />
            <Typography variant="body2" color="text.secondary">
              Total Attendance Records
            </Typography>
          </Item>
        </Grid>

        {/* Attendance Table */}
        <Grid xs={12} md={6}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Attendance Records
            </Typography>
            <TableContainer component={Paper} elevation={1}>
              <Table sx={{ minWidth: 650 }} aria-label="attendance table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData.map((attendance) => (
                    <TableRow
                      key={attendance._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        backgroundColor:
                          attendance.status === "Present"
                            ? "rgba(76, 175, 80, 0.1)"
                            : "rgba(244, 67, 54, 0.1)",
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {convertDate(attendance.date)}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: "bold",
                          color:
                            attendance.status === "Present" ? "green" : "red",
                        }}
                      >
                        {attendance.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default AttendanceDetails;
