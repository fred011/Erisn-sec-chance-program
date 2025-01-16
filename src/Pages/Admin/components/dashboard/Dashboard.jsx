/* eslint-disable no-unused-vars */

import React from "react";

import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

// import { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [adminName, setAdminName] = useState("");

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       try {
//         const response = await axios.get("/fetch-single");
//         if (response.data.success) {
//           setAdminName(response.data.admin.name);
//         }
//       } catch (error) {
//         console.error("Error fetching admin data:", error);
//       }
//     };

//     fetchAdminData();
//   }, []);

//   return (
//     <>
//       <Box
//         sx={{
//           height: "270px",
//           width: "100%",
//           background: `url(/images/BackG.jpg)`,
//           backgroundSize: "cover",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Box
//           sx={{
//             textAlign: "center",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="h3" color="lightgrey">
//             Welcome, {adminName}
//           </Typography>

//           <Typography variant="h5" color="grey">
//             To Erisn Africa`s Student Management System
//           </Typography>
//         </Box>
//       </Box>
//     </>
//   );
// };

const Dashboard = () => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          "https://erisn-api.onrender.com/api/admin/fetch-single"
        );
        if (response.data.success) {
          setAdminName(response.data.admin.name);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <>
      <Box
        sx={{
          height: "270px",
          width: "100%",
          background: `url(/images/BackG.jpg)`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" color="lightgrey">
            Welcome, {adminName}
          </Typography>

          <Typography variant="h5" color="grey">
            To Erisn Africa`s Student Management System
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;

{
  /* <Box
        component={"div"}
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {subjects &&
          subjects.map((x) => {
            return (
              <Paper key={x._id} sx={{ m: 2, p: 2 }}>
                <Box component={"div"}>
                  <Typography variant="h4">
                    Subject: {x.subject_name} [{x.subject_codename}]
                  </Typography>
                </Box>
                <Box component={"div"}>
                  <Button
                    onClick={() => {
                      handleEdit(x._id, x.subject_name, x.subject_codename);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(x._id);
                    }}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              </Paper>
            );
          })}
      </Box> */
}
