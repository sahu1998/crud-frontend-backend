import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { deleteApiHandler, getApiHandler } from "../../apiHandler";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout";
import swal from "sweetalert";
import SearchBar from "../search-bar";
import { useDebounce } from "use-debounce-hooks";
export default function ContactTable() {
  const [contact, setContact] = useState([]);
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [findData, setFindData] = useState();
  const [search, setSearch, cancel] = useDebounce("", 1500);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      renderCell: (params) => {
        return page * pageSize + params.api.getRowIndex(params.row._id) + 1;
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

  const searchContact = async (currentPage = page) => {
    console.log("searching...");
    setOpen(true);
    const temp = await getApiHandler(
      `/get/${currentPage * 5}/${pageSize}/?key=${search}`
    );
    console.log("data: ", temp);
    if (temp.status === 200) {
      setContact(temp.response);
      setRowCount(temp.length);
    }
    setOpen(false);
  };

  const getContact = async (currentPage = page) => {
    console.log("akjsdjfkd: ", page);
    setOpen(true);
    const temp = await getApiHandler(`/${currentPage * 5}/${pageSize}`);
    console.log("data: ", temp);
    if (temp.status === 200) {
      setContact(temp.response);
      setRowCount(temp.length);
    }
    setOpen(false);
  };

  useEffect(() => {
    console.log("fjkdsjfkdsfs: ", search);
    if (search) {
      searchContact();
    } else {
      getContact(page);
    }
    cancel();
  }, [search, page]);

  return (
    <MainLayout>
      <Container>
        <div className="py-4">
          <SearchBar setFindData={setSearch} />
        </div>
        <div
          style={{
            height: 500,
            width: "100%",
          }}
        >
          <DataGrid
            rows={contact}
            rowCount={rowCount}
            loading={open}
            columns={columns}
            rowsPerPageOptions={[5]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            getRowId={(row) => row._id}
            density="comfortable"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          />
        </div>
      </Container>
    </MainLayout>
  );
}
