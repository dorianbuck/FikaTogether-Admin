import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import AddParticipantModal from "./AddParticipantModal";
import Modal from "@mui/material/Modal";

const ParticipantList = () => {
  const { participantList, departments } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      headerAlign: "center",
    },
    {
      field: "score",
      headerName: "Fika Score",
      flex: 1,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      headerAlign: "center",
    },
  ];

  let rows = departments[participantList.id - 1].participants.map(
    (participant) => {
      return {
        id: participant.id,
        name: participant.name,
        score: participant.fika_score,
      };
    }
  );

  const useStyles = makeStyles({
    root: {
      "& .super-app-theme--header": {
        backgroundColor: "rgba(0,0,0,.85)",
        fontSize: "1.2rem",
        fontWeight: "bold",
      },
      "& .super-app-theme--cell": {
        fontWeight: "600",
        textAlign: "center",
      },
    },
  });
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <LoadingButton
        data-cy="manage-participants-btn"
        type="link"
        variant="contained"
        margin="dense"
        // loading={loading}
        sx={{
          backgroundColor: "#4C9074",
          m: 5
        }}
        onClick={handleOpen}
      >
        Manage Participant
      </LoadingButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddParticipantModal />
      </Modal>

      <div
        style={{ width: "100%", height: 400 }}
        data-cy="participant-table"
        className={classes.root}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </Container>
  );
};

export default ParticipantList;