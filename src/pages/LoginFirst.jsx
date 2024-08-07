import { NavLink } from "react-router-dom";

export const LoginFirst = () => {
  return (
    <>
      <section id="error-page">
        <div style={{ position: "relative", top: "15em" }}>
          <div className=" content" style={{ color: "black" }}>
            <h1>You are not logged in,Please login</h1>
            <br />
            <br />

            <div className="btns">
              <NavLink to="/">Return home</NavLink>
              <NavLink to="/login">Login page</NavLink>
              <NavLink to="/contact">Report Problem</NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
