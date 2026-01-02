import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import CreateEvent from "../pages/CreateEvent";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#fa7516" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">BRICS</Typography>

          <Button
            variant="con"
            sx={{
              bgcolor: "#fa7516",
              "&:hover": {
                bgcolor: "#e56712", // slightly darker for hover
              },
            }}
            onClick={() => setShowModal(true)}
          >
            Create Event
          </Button>
        </Toolbar>
      </AppBar>

      {showModal && <CreateEvent setShowModal={setShowModal} />}
    </>
  );
};

export default Navbar;
