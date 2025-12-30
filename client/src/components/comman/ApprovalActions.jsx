import { Button, Stack } from "@mui/material";

const ApprovalActions = () => {
  const handleApprove = () => {
    alert("Approved");
  };

  const handleReject = () => {
    alert("Rejected");
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        size="small"
        variant="contained"
        color="success"
        onClick={handleApprove}
      >
        Approve
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="error"
        onClick={handleReject}
      >
        Reject
      </Button>
    </Stack>
  );
};

export default ApprovalActions;
