import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  console.log("login or not ", isLoggedIn);
  return (
    <>
      <div className="navbar">
        <header>
          <div className="container">
            <div className="logo-brand">
              <NavLink to="/">
                {" "}
                <img
                  src="/images/des.png"
                  alt="we are always ready to help"
                  style={{
                    height: "60px",
                    width: "60px",
                    position: "relative",

                    left: "-1em",
                    top: "-1em",
                    display: "inline-block",
                  }}
                />
              </NavLink>
            </div>

            <nav>
              <ul>
                <li>
                  <NavLink to="/">
                    <div className="color">Home </div>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/contact">
                    {" "}
                    <div className="color">Contact </div>
                  </NavLink>
                </li>

                {isLoggedIn ? (
                  <>
                    <li>
                      <NavLink to="/payment">
                        <div className="color">Payment</div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/form">
                        <div className="color">Form </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/register">
                        {" "}
                        <div className="color">Register </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/logout">
                        {" "}
                        <div className="color">Logout </div>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink to="/login">
                        {" "}
                        <div className="color">Login </div>{" "}
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};
