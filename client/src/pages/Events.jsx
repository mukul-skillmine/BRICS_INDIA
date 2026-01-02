import { useEffect, useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateEvent from "./CreateEvent";
import axios from "axios";
import EventCard from "../components/comman/EventCard";

const Events = () => {
  const [showModal, setShowModal] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [loading,setLoading] = useState(false);

  const getTheEventList = async () => {
      setLoading(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/event/list`
      );
      setEventList(response?.data?.eventList);
      console.log(response?.data?.eventList);
    } catch (error) {
      console.log(error.message);
      console.log("Error while fetching the data from the api");
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getTheEventList();
  }, []);

  return (
    <>
      {/* HEADER ROW */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={8}
        mb={2}
      >
        <Typography variant="h5" fontWeight={600}>
          Events
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowModal(true)}
          sx={{
            bgcolor: "#fa7516",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Create Event
        </Button>
      </Box>

      {/* EMPTY STATE */}
 {loading && <div className="w-full flex h-screen justify-center items-center">
          <p>Loading...</p>
        </div> }
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
       
        {eventList.length > 0 ? (
          eventList.map((event) => (
            <div className="w-full ">
              <EventCard cardData={event} />
            </div>
          ))
        ) : (
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
        )}
      </div>

      {/* MODAL */}
      {showModal && <CreateEvent setShowModal={setShowModal} />}
    </>
  );
};

export default Events;
