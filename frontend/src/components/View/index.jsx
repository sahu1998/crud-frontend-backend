import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useEffect } from "react";
import { deleteApiHandler, getApiHandler } from "../../apiHandler";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout";
import swal from "sweetalert";
export default function ContactTable() {
  const [contact, setContact] = useState([]);
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      renderCell: (params) => {
        return params.api.getRowIndex(params.row._id) + 1;
      },
    },
    { field: "name", headerName: "Name", width: 130 },
    { field: "age", headerName: "Age", width: 20 },
    { field: "contact", headerName: "Contact", width: 150 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="warning"
            // color="warning"
            onClick={() => {
              deleteContact(params.row._id);
            }}
            endIcon={<DeleteOutlineIcon />}
          >
            Delete
          </Button>
        );
      },
    },
    {
      field: "update",
      headerName: "Update",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              updateContact(params.row._id);
            }}
            endIcon={<EditIcon />}
          >
            Update
          </Button>
        );
      },
    },
  ];

  const updateContact = (id) => {
    console.log("updateContact: ", id);
    history(`/addContact?id=${id}`);
  };

  const deleteContact = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    });

    if (willDelete) {
      const result = await deleteApiHandler(`/${id}`);
      if (result.data.status === 200) {
        await swal(
          "Deleted!",
          "Your imaginary file has been deleted!",
          "success"
        );
        await getContact();
      }
    }
  };

  const getContact = async () => {
    setOpen(true);
    const temp = await getApiHandler(`/`);
    console.log("data: ", temp);
    if (temp.status === 200) {
      setContact(temp.response);
    }
    setOpen(false);
  };

  useEffect(() => {
    getContact();
  }, []);
  return (
    <MainLayout>
      <Container>
        {open ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <div
            style={{
              height: 600,
              width: "100%",
            }}
          >
            <DataGrid
              rows={contact}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row._id}
              density="comfortable"
              autoPageSize={true}
            />
          </div>
        )}
      </Container>
    </MainLayout>
  );
}
