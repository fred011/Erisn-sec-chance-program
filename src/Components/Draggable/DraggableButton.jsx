import { Button } from "@mui/material";
import Draggable from "react-draggable";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useContext } from "react";
import { AuthContext } from "../../Pages/AuthPages/AuthContext";

export default function DraggableButton() {
  const { dark, modeChange } = useContext(AuthContext);

  return (
    <>
      <Draggable>
        <Button
          sx={{
            background: "transparent",
            zIndex: "9999900000000",
            display: "flex",
            position: "fixed",
            top: "20px",
            right: "20px",
          }}
          onClick={modeChange}
        >
          {dark ? (
            <DarkModeIcon sx={{ color: "black" }} />
          ) : (
            <LightModeIcon sx={{ color: "yellow" }} />
          )}
        </Button>
      </Draggable>
    </>
  );
}
