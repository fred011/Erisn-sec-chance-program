/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
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
} from "@mui/material";
import { PieChart } from "@mui/x-charts";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function AttendanceDetails() {
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);
  const studentId = useParams().id;
  const navigate = useNavigate;

  const convertDate = (dateData) => {
    const date = new Date();
    return (
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear
    );
  };
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`${baseAPI}/attendance/${studentId}`);
      console.log("RESPONSE ATTENDANCE:", response);
      setAttendanceData(response.data);
      const respData = response.data;
      console.log("RESPDATA:", respData);
      if (respData) {
        respData.forEach((attendance) => {
          if (attendance.status === "Present") {
            setPresent(present + 1);
          } else if (attendance.status === "Absent") {
            setAbsent(absent + 1);
          }
        });
      }
    } catch (error) {
      console.lo("Error in fetching student attendance.", error);
      navigate("/admin/attendance");
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <>
      <h1>Attendance Details</h1>

      <Grid container spacing={2}>
        <Grid size={6}>
          <Item>
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
              height={200}
            />
          </Item>
        </Grid>
        <Grid size={6}>
          <Item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {convertDate(attendance.date)}
                      </TableCell>
                      <TableCell align="right">{attendance.status}</TableCell>
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
}
