import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";
import { updateAccessToken } from "../../redux/user/userSlice";

export default function AdminRoute() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser.data.user.role === "admin" ? <Outlet /> : <Spinner />;
}
