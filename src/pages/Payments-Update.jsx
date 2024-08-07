import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const PaymentsUpdate = () => {
  const [user, setUser] = useState({
    username: "",
    phone: "",
    payment_method: "",
    amount: "",
    number: "",
    time: "",
    // Add more indicate pain properties here as needed
  });
  const params = useParams();
  console.log("params single user:", params);
  const { authorizationToken } = useAuth();

  const getSingleUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5500/api/admin/payments/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`Payments Forms single Data :${data}`);
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5500/api/admin/payments/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(user),
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
      navigate("/admin/payments");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="back">
        <div
          style={{
            backgroundColor: "white",
            height: "760px",
            width: "950px",
            position: "relative",
            left: "15em",
            top: "4em",
            display: "flex",
            // border: "1px solid black",
          }}
        >
          <div
            style={{
              backgroundImage: `url("images/Payment.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "280px",
              height: "760px",
            }}
          ></div>
          <div
            style={{ position: "relative", left: "10em", fontFamily: "ariel" }}
          >
            <br />
            <h1 style={{ position: "relative", left: "2em", color: "black" }}>
              Payment Form
            </h1>
            <br />
            <br />

            <div
              style={{
                color: "black",
                fontSize: "17.5px",
                postion: "relative",
                left: "1em",
              }}
            >
              <form onSubmit={handleSubmit}>
                <div style={{ position: "relative", left: "6em" }}>
                  Enter the payment details of paitent.
                </div>
                <br />
                <br />
                <div>
                  &nbsp;&nbsp;Enter the paitent name
                  <br />
                  <input
                    type="text"
                    className="info"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div style={{ position: "relative", top: "1.5em" }}>
                  &nbsp;&nbsp;Contact Number
                  <br />
                  <input
                    type="number"
                    className="info"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div style={{ position: "relative", top: "4em" }}>
                  &nbsp;&nbsp;Select Payment Method &nbsp;&nbsp;
                  <br />
                  <div
                    className="box1"
                    style={{
                      width: "450px",
                      position: "relative",
                      top: "1em",
                      left: "1em",
                    }}
                  >
                    <input
                      className="radio"
                      type="radio"
                      onChange={handleInput}
                      name="payment_method"
                      value="UPI"
                      checked={user.payment_method === "UPI"}
                    />
                    UPI
                    <input
                      className="radio"
                      type="radio"
                      onChange={handleInput}
                      name="payment_method"
                      value="Cash"
                      checked={user.payment_method === "Cash"}
                    />
                    Cash
                    <input
                      className="radio"
                      type="radio"
                      onChange={handleInput}
                      name="payment_method"
                      value="Cheque"
                      checked={user.payment_method === "Cheque"}
                    />
                    Cheque
                    <input
                      className="radio"
                      type="radio"
                      onChange={handleInput}
                      name="payment_method"
                      value="other"
                      checked={user.payment_method === "Others"}
                    />
                    Others
                  </div>
                  <br />
                </div>
                <div style={{ position: "relative", top: "5.5em" }}>
                  &nbsp;&nbsp;Enter the amount
                  <br />
                  <input
                    type="text"
                    className="info"
                    name="amount"
                    value={user.amount}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div style={{ position: "relative", top: "7.5em" }}>
                  &nbsp;&nbsp;Enter Transaction Id/Cheque Number (If Applicable)
                  <br />
                  <input
                    type="text"
                    className="info"
                    name="number"
                    value={user.number}
                    onChange={handleInput}
                  />
                </div>
                <br />
                <div style={{ position: "relative", top: "7.5em" }}>
                  &nbsp;&nbsp;Enter Transaction date and time
                  <br />
                  <input
                    type="text"
                    className="info"
                    name="time"
                    value={user.time}
                    onChange={handleInput}
                  />
                </div>

                <br />
                <button
                  type="submit"
                  className="btn btn-submit"
                  style={{ position: "relative", top: "10em", left: "15em" }}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
