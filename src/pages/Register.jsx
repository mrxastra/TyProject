import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const [user1, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS, user, isLoading } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user1,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5500/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user1),
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);

        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successful");

        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("register", error);
    }
  };

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }

  if (!user.isAdmin) {
    // If user is not an admin, redirect them to an error page or display a message
    return <Navigate to="/adminerror" />;
  }

  return (
    <>
      <section>
        <main>
          <div className="page">
            <div className="section-registration">
              <div className="container grid grid-two-cols">
                <div className="registration-image reg-img">
                  <img
                    src="/images/register2.png"
                    alt="register"
                    width="400"
                    height="500"
                    style={{ height: "500px", width: "500px" }}
                  />
                </div>
                {/* our main registration code  */}
                <div className="registration-form">
                  <h1 style={{ color: "black" }}>Registration form</h1>
                  <br />
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="username" style={{ color: "black" }}>
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={user1.username}
                        onChange={handleInput}
                        placeholder="username"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" style={{ color: "black" }}>
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={user1.email}
                        onChange={handleInput}
                        placeholder="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" style={{ color: "black" }}>
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="phone"
                        placeholder="phone number"
                        value={user1.phone}
                        onChange={handleInput}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" style={{ color: "black" }}>
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={user1.password}
                        onChange={handleInput}
                        placeholder="password"
                      />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-submit">
                      Register Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
