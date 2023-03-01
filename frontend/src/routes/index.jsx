import React from "react";
import { Route, Routes } from "react-router-dom";
import UserForm from "../components/Form";
import ContactTable from "../components/View";
import Home from "../components/Home";
export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addcontact" element={<UserForm />} />
      <Route path="/contactlist" element={<ContactTable />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}
