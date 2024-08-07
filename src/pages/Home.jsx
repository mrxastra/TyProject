import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Home = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <div
        style={{
          backgroundImage: `url("images/home.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "relative",
            top: "11em",
            fontSize: "1em",
            left: "2em",
          }}
        >
          <div>
            <div className="logo-brand">
              <NavLink to="/">
                {" "}
                <img
                  src="/images/des.png"
                  alt="we are always ready to help"
                  style={{
                    height: "100px",
                    width: "100px",
                    position: "relative",
                    top: "-1em",

                    left: "1em",
                  }}
                />
              </NavLink>
            </div>
            <div>
              <h1 className="college" style={{color: "white"}}>
                D.E. Society's Brijlal Jindal College of <br />
                &nbsp;Physiotherapy, Pune
                <br />
                <br />
              </h1>
              <h1 className="emr">&nbsp;Electronic Medical Records</h1>
            </div>

            <p
              style={{
                fontSize: "2em",
                position: "relative",
                left: "0.5em",
                top: "-3em",
              }}
            >
              <div className="line">
                Welcome users of the electronic medical records, have a
                hassle-free filling and accessing of your data.
              </div>
            </p>
            <p>
              <NavLink to="/admin">
                <button
                  type="submit"
                  className="btn btn-submit"
                  style={{
                    position: "relative",
                    top: "-0.5em",
                    left: "1em",
                    width: "150px",
                    backgroundColor: " rgb(245, 169, 63)",
                    border: "2px solid white",
                    color: "black",
                  }}
                >
                  Admin Section
                </button>
              </NavLink>

              {isLoggedIn ? (
                <>
                  <NavLink to="/form">
                    <button
                      type="submit"
                      className="btn btn-submit"
                      style={{
                        position: "relative",
                        top: "-0.5em",
                        left: "3em",
                        width: "140px",
                        backgroundColor: " rgb(245, 169, 63)",
                        border: "2px solid white",
                        color: "black",
                      }}
                    >
                      Enter Record
                    </button>
                  </NavLink>
                  <NavLink to="/payment">
                    <button
                      type="submit"
                      className="btn btn-submit"
                      style={{
                        position: "relative",
                        top: "-0.5em",
                        left: "5em",
                        width: "150px",
                        backgroundColor: " rgb(245, 169, 63)",
                        border: "2px solid white",
                        color: "black",
                      }}
                    >
                      Payment Form
                    </button>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/loginfirst">
                    <button
                      type="submit"
                      className="btn btn-submit"
                      style={{
                        position: "relative",
                        top: "-0.5em",
                        left: "3em",
                        width: "140px",
                        backgroundColor: " rgb(245, 169, 63)",
                        border: "2px solid white",
                        color: "black",
                      }}
                    >
                      Enter Record
                    </button>
                  </NavLink>
                  <NavLink to="/loginfirst">
                    <button
                      type="submit"
                      className="btn btn-submit"
                      style={{
                        position: "relative",
                        top: "-0.5em",
                        left: "6em",
                        width: "150px",
                        backgroundColor: " rgb(245, 169, 63)",
                        border: "2px solid white",
                        color: "black",
                      }}
                    >
                      Payment Form
                    </button>
                  </NavLink>
                </>
              )}
              <NavLink to="/records">
                <button
                  type="submit"
                  className="btn btn-submit"
                  style={{
                    position: "relative",
                    top: "-0.5em",
                    left: "7.5em",
                    width: "150px",
                    backgroundColor: " rgb(245, 169, 63)",
                    border: "2px solid white",
                    color: "black",
                  }}
                >
                  Records
                </button>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
