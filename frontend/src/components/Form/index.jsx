import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { getApiHandler, postApiHandler, putApiHandler } from "../../apiHandler";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MainLayout from "../../layout";
const theme = createTheme();

const schema = yup.object().shape({
  name: yup
    .string()
    .required("*Name is required")
    .matches(/^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/, "*Use only alphabats"),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
      "*Incorrect Email"
    )
    .required("*email is required"),
  age: yup
    .string()
    .required("*Age is required")
    .matches(/^[0-9]+$/, "Must be only digits"),
  contact: yup
    .string()
    .required("*Contact is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
});

const UserForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = React.useState(false);

  let id = useSearchParams()[0].get("id");
  const history = useNavigate();

  const prefilledForm = async () => {
    setOpen(true);
    const result = await getApiHandler(`/?id=${id}`);
    if (result.status == 200) {
      const { name, email, age, contact } = result.response;
      console.log("prefilled: ", result.response);
      setValue("name", name);
      setValue("email", email);
      setValue("contact", contact);
      setValue("age", age);
    } else {
      setValue("name", "");
      setValue("email", "");
      setValue("contact", "");
      setValue("age", "");
    }
    setOpen(false);
  };
  useEffect(() => {
    if (id) {
      prefilledForm();
    } else {
      setValue("name", "");
      setValue("email", "");
      setValue("contact", "");
      setValue("age", "");
    }
  }, [id]);

  const onSubmit = async (values) => {
    const willPerform = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Update?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    });

    setOpen(true);
    const result = id
      ? willPerform && (await putApiHandler(`/${id}`, values))
      : await postApiHandler("/", values);
    if (result.status === 200) {
      id
        ? await swal("Success!", "Data Update Successfully!", "success")
        : await swal("Success!", "Data Added Successfully!", "success");
    }
    console.log("onSubmit: ", result);

    setOpen(false);
    history("/contactlist");
  };

  return (
    <MainLayout>
      {open ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <ContactsIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {id ? "Update Contact" : "Add Contact"}
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="name"
                      required
                      fullWidth
                      label="Name"
                      type="text"
                      {...register("name")}
                      error={!!errors?.name}
                      helperText={errors?.name?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="age"
                      required
                      fullWidth
                      label="Age"
                      type="number"
                      {...register("age")}
                      error={!!errors?.age}
                      helperText={errors?.age?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      {...register("email")}
                      error={!!errors?.email}
                      helperText={errors?.email?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="contact"
                      label="Contact"
                      type="text"
                      {...register("contact")}
                      error={!!errors?.contact}
                      helperText={errors?.contact?.message}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {id ? "Update" : "Add"}
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </MainLayout>
  );
};

export default UserForm;
