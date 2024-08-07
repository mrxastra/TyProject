import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "./a.css";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  console.log("admin layout", user);
  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/adminerror" />;
  }
  return (
    <>
      <div
        style={{
          background:
            " radial-gradient(circle at 7.5% 24%, rgb(237, 161, 193) 0%, rgb(250, 178, 172) 25.5%, rgb(190, 228, 210) 62.3%, rgb(215, 248, 247) 93.8%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            // background: "white",
            position: "relative",
            top: "5em",
            //minHeight: "100vh",
          }}
        >
          <h1
            style={{
              fontSize: "30px",
              position: "relative",
              top: "3em",
              left: "1em",
              color: "black",
            }}
          >
            {" "}
          </h1>
          <br />
          <div
            className="container"
            style={{ position: "relative", top: "-8em" }}
          >
            <div className="area" style={{ position: "relative", top: "1em" }}>
              {" "}
              <img src="/images/user.jpg" className="tab" />
              <NavLink to="/admin/users">
                <button className="button-19">Users</button>
              </NavLink>
            </div>

            <div className="area" style={{ position: "relative", top: "1em" }}>
              {" "}
              <img src="/images/pay.png" className="tab" />
              <NavLink to="/admin/payments">
                <button className="button-19">Payment</button>
              </NavLink>
            </div>

            <div className="area" style={{ position: "relative", top: "1em" }}>
              {" "}
              <img src="/images/form.jpg" className="tab" />
              <NavLink to="/admin/forms">
                <button className="button-19">Form</button>{" "}
              </NavLink>
            </div>

            <div className="area" style={{ position: "relative", top: "1em" }}>
              {" "}
              <img src="/images/cont.jpg" className="tab" />
              <NavLink to="/admin/contacts">
                <button className="button-19">Contacts</button>
              </NavLink>
            </div>
          </div>
          <br />
          <br />
          <br />

          <Outlet />
        </div>
      </div>
    </>
  );
};
