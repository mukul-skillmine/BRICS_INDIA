import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Container,
  Stack,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import BarChartIcon from "@mui/icons-material/BarChart";

/* ================= KPI DATA ================= */
const KPI_STATS = [
  {
    title: "Total Events",
    value: "12",
    icon: <EventIcon sx={{ color: "#fff" }} />,
    bg: "#FA7516",
  },
  {
    title: "Total Registrations",
    value: "1,248",
    icon: <PeopleIcon sx={{ color: "#fff" }} />,
    bg: "#2563EB",
  },
  {
    title: "Approved",
    value: "980",
    icon: <AssignmentTurnedInIcon sx={{ color: "#fff" }} />,
    bg: "#16A34A",
  },
  {
    title: "Pending Approval",
    value: "268",
    icon: <PendingActionsIcon sx={{ color: "#fff" }} />,
    bg: "#F59E0B",
  },
];

/* ================= KPI CARD ================= */
const StatCard = ({ title, value, icon, bg }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      borderRadius: 2,
      border: "1px solid #E5E7EB",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100%",
    }}
  >
    <Box>
      <Typography fontSize={13} color="text.secondary">
        {title}
      </Typography>
      <Typography fontSize={22} fontWeight={700}>
        {value}
      </Typography>
    </Box>

    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        bgcolor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </Box>
  </Paper>
);

/* ================= PAGE ================= */
const Home = () => {
  return (
    <Box sx={{ pt: "80px", pb: 3, backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <Container maxWidth="xl">

        {/* ================= KPI ROW ================= */}
        <Grid container spacing={2} mb={2}>
          {KPI_STATS.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <StatCard {...item} />
            </Grid>
          ))}
        </Grid>

        {/* ================= MAIN ROW ================= */}
        <Grid container spacing={2} mb={2}>
          {/* LEFT: CHART */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid #E5E7EB",
                height: "100%",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography fontWeight={600}>
                  Registrations Overview
                </Typography>

                <Button
                  size="small"
                  startIcon={<BarChartIcon />}
                  sx={{ textTransform: "none" }}
                >
                  View Report
                </Button>
              </Box>

              <Box
                sx={{
                  height: 260,
                  bgcolor: "#F3F4F6",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9CA3AF",
                }}
              >
                Chart will come here
              </Box>
            </Paper>
          </Grid>

          {/* RIGHT: STACKED WIDGETS */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              {/* Today Summary */}
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <Typography fontWeight={600} mb={2}>
                    Today’s Summary
                  </Typography>

                  <Typography mb={1}>📅 Events Today: <b>2</b></Typography>
                  <Typography mb={1}>📝 New Registrations: <b>45</b></Typography>
                  <Typography mb={1}>✅ Approved Today: <b>30</b></Typography>
                  <Typography>⏳ Pending: <b>15</b></Typography>
                </Paper>
              </Grid>

              {/* Quick Actions */}
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <Typography fontWeight={600} mb={2}>
                    Quick Actions
                  </Typography>

                  <Stack spacing={1}>
                    <Button variant="contained" fullWidth>
                      Create Event
                    </Button>
                    <Button variant="outlined" fullWidth>
                      View Registrations
                    </Button>
                    <Button variant="outlined" fullWidth>
                      Export Report
                    </Button>
                  </Stack>
                </Paper>
              </Grid>

              {/* Approval Status */}
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <Typography fontWeight={600} mb={2}>
                    Approval Status
                  </Typography>

                  <Box
                    sx={{
                      height: 160,
                      bgcolor: "#F3F4F6",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#9CA3AF",
                    }}
                  >
                    Pie / Donut Chart
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* ================= RECENT REGISTRATIONS ================= */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid #E5E7EB",
            mb: 2,
          }}
        >
          <Typography fontWeight={600} mb={2}>
            Recent Registrations
          </Typography>

          <Table size="small">
            <TableBody>
              {["John Doe", "Jane Smith", "Alex Brown", "Emily Clark"].map(
                (name, i) => (
                  <TableRow key={i}>
                    <TableCell>{name}</TableCell>
                    <TableCell align="right">Approved</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Paper>

        {/* ================= EVENT STATS ================= */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid #E5E7EB",
          }}
        >
          <Typography fontWeight={600} mb={1}>
            Event-wise Registration Stats
          </Typography>

          <Box
            sx={{
              height: 240,
              bgcolor: "#F3F4F6",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9CA3AF",
            }}
          >
            Event-wise analytics widget
          </Box>
        </Paper>

      </Container>
    </Box>
  );
};

export default Home;
