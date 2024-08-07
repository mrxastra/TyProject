import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    password:"",
  });
  const params = useParams();
  const { authorizationToken } = useAuth();
  const navigate = useNavigate();

  const getSingleUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5500/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`users single Data :${data}`);
      setData(data);
      //  if (response.ok) {
      //    getAllUsersData();
      //  }
    } catch (error) {
      next(error);
    }
  };
  useEffect(() => {
    getSingleUserData();
  }, []);
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  //to update data

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5500/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const confirmed = window.confirm(
          "Update was successful. Do you want to proceed?"
        );
        if (confirmed) {
          // Proceed with further actions
          toast.success("Updated successfully");
        } else {
          // No further action needed
          toast.info("Update canceled");
        }
      } else {
        toast.error("Not updated");
      }
      navigate("/admin/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-contact">
      <div>
        <h1
          style={{
            color: "black",
            fontSize: "45px",
            position: "relative",
            left: "0.5em",
            top: "0.3em",
          }}
        >
          Update User Data
        </h1>
      </div>
      {/* contact page main  */}
      <div className="container grid grid-two-cols">
        {/* contact form content actual  */}
        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" style={{ color: "black" }}>
                username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={data.username}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="email" style={{ color: "black" }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={data.email}
                onChange={handleInput}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" style={{ color: "black" }}>
                phone
              </label>
              <input
                type="phone"
                name="phone"
                id="phone"
                autoComplete="off"
                value={data.phone}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" style={{ color: "black" }}>
                password
              </label>
              <input
                type="password"
                name="password"
                id="phone"
                autoComplete="off"
                value={data.password}
                onChange={handleInput}
                required
              />
            </div>

            <NavLink to="/admin">
              <button>Back</button>
            </NavLink>

            <div>
              <button
                type="submit"
                style={{ position: "relative", top: "-4.2em", left: "22em" }}
              >
                Update
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
