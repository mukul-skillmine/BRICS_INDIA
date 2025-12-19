import { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateEvent from "./CreateEvent";

const Events = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* HEADER ROW */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={600}>
          Events
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowModal(true)}
          sx={{
            bgcolor: "#1976d2",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Create Event
        </Button>
      </Box>

      {/* EMPTY STATE */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: "1px solid #E5E7EB",
          color: "#6B7280",
        }}
      >
        No events created yet.
      </Paper>

      {/* MODAL */}
      {showModal && <CreateEvent setShowModal={setShowModal} />}
    </>
  );
};

export default Events;
