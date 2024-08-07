import { NavLink } from "react-router-dom";

export const Notadmin = () => {
  return (
    <>
      <section id="error-page">
        <div style={{ position: "relative", top: "15em" }}>
          <div className=" content" style={{ color: "black" }}>
            <h1>Sorry! You are not verified as Admin</h1>
            <br />
            <br />

            <div className="btns">
              <NavLink to="/">return home</NavLink>
              <NavLink to="/logout">Login again</NavLink>
              <NavLink to="/contact">report problem</NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
