import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Alogin = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // let handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        
        console.log("res from server", res_data);
        storeTokenInLS(res_data.token);
        setUser({ email: "", password: "" });
        toast.success("Login Succesfull");
        // const responseData = await response.json();
        //  console.log("after login: ", responseData);
        // toast.success("Registration Successful");
        //   saveTokenInLocalStr(responseData.token);
        navigate("/admin");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        // alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="pagea">
            <div className="section-registration">
              <div style={{ position: "relative", top: "-6em" }}>
                <div className="container grid grid-two-cols">
                  <div className="registration-image reg-img">
                    <img
                      src="/images/register.png"
                      alt="a nurse with a cute look"
                      width="400"
                      height="500"
                      style={{
                        position: "relative",
                        width: "550px",
                        height: "550px",
                        top: "-3em",
                        display: "inline-block",
                      }}
                    />
                  </div>
                  {/* our main registration code  */}
                  <div className="registration-form">
                    <h1 style={{ color: "black", fontSize: "40px" }}>
                      Welcome Admin!
                      <h1
                        style={{
                          color: "black",
                          fontSize: "35px",
                          position: "relative",
                          top: "0.5em",
                        }}
                      >
                        {" "}
                        Please Login
                      </h1>{" "}
                    </h1>
                    <br />
                    <br />
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="email" style={{ color: "black" }}>
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={user.email}
                          onChange={handleInput}
                          placeholder="email"
                        />
                      </div>

                      <div>
                        <label htmlFor="password" style={{ color: "black" }}>
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={handleInput}
                          placeholder="password"
                        />
                      </div>
                      <br />
                      <br />
                      <br />
                      <button type="submit" className="btn btn-submit">
                        Login Now
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
