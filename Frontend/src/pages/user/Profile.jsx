import React, { useEffect, useState } from "react";
import Header from "./../../components/Header";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { updateUserSuccess } from "../../redux/user/userSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(currentUser);

  useEffect(() => {
    const { username, email } = currentUser.data.user;
    setUsername(username);
    setEmail(email);
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(username);
    try {
      const res = await axios.put(
        "/api/v1/users/update-detail",
        { username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.data;
      console.log(currentUser);
      console.log(data);
      dispatch(updateUserSuccess({ data: { user: data.data } }));
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <section className="container mb-10   md:w-1/3 md:mx-auto md:bg-light p-4 rounded-[12px] md:shadow-md">
        <h1 className="text-center font-semibold uppercase text-xl mb-4">
          My Account
        </h1>
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col gap-8 mx-4  border-dark border-opacity-70 p-4"
        >
          <div className="flex flex-col gap-2">
            <label
              className="font-medium uppercase text-dark "
              htmlFor="username"
            >
              Username
            </label>
            <div className="flex gap-4">
              <input
                className="px-2 rounded-sm w-full bg-light border border-dark border-opacity-25 py-1"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primaryRed px-4 rounded-sm text-base font-medium text-light"
              >
                {loading ? "Changing" : "Change"}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium uppercase text-dark " htmlFor="email">
              Email
            </label>
            <input
              disabled
              className="px-2 rounded-sm bg-light border border-dark border-opacity-25 py-1"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="font-medium uppercase text-dark "
              htmlFor="password"
            >
              Change Password
            </label>
            <Link
              to="/request-password-change"
              className="text-primaryOrange underline"
            >
              Click here to change password
            </Link>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default Profile;
