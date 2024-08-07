import { useState } from "react";
import { useAuth } from "../store/auth";
import "./Payment.css";
import "./Forms.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const defaultPaymentFormData = {
  username: "",
  phone: "",
  payment_method: "",
  amount: "",
  number: "",
  time: "",
};

export const Payment = () => {
  const [payment, setpayment] = useState(defaultPaymentFormData);
  const [isPaymentMethodFilled, setIsPaymentMethodFilled] = useState(true);
  const [userData, setUserData] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (userData && user) {
    setpayment({
      username: "",
      phone: "",
      payment_method: "",
      amount: "",
      number: "",
      time: "",
    });
    setUserData(false);
  }

  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setpayment({
      ...payment,
      [name]: value,
    });
  };

  const Selectedvalue = (event) => {
    setUserData(event.target.value);
  };

  // handle fomr getFormSubmissionInfo
  const handleSubmit = async (e) => {
    e.preventDefault();
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(payment.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!payment.payment_method) {
      setIsPaymentMethodFilled(false); // Set isPaymentMethodFilled to false if payment method is not filled
      return;
    }
    try {
      const response = await fetch("http://localhost:5500/api/form/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      });

      if (response.ok) {
        navigate("/");
        setpayment(defaultPaymentFormData);

        const data = await response.json();
        console.log(data);
        toast.success("Data added Succesfully!");
      }
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
                    placeholder=" Enter paitent name"
                    value={payment.username}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div style={{ position: "relative", top: "1.5em" }}>
                  &nbsp;&nbsp;Contact Number
                  <br />
                  <input
                    type="text" // Changed type to "text"
                    className="info"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    placeholder=" Enter 10 digit contact number"
                    value={payment.phone}
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
                      required
                    />
                    UPI
                    <input
                      className="radio"
                      type="radio"
                      onChange={handleInput}
                      name="payment_method"
                      value="Cash"
                    />
                    Cash
                    <input
                      className="radio"
                      type="radio"
                      onChange={handleInput}
                      name="payment_method"
                      value="Cheque"
                    />
                    Cheque
                    <input
                      className="radio"
                      type="radio"
                      onChange={handleInput}
                      name="payment_method"
                      value="Cheque"
                    />
                    Others
                  </div>
                  <br />
                </div>
                {!isPaymentMethodFilled && (
                  <p style={{ color: "red" }}>
                    Please select a payment method.
                  </p>
                )}
                <div style={{ position: "relative", top: "5.5em" }}>
                  &nbsp;&nbsp;Enter the amount
                  <br />
                  <input
                    type="text"
                    className="info"
                    name="amount"
                    value={payment.amount}
                    onChange={handleInput}
                    placeholder=" Enter amount in RS."
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
                    placeholder=" Enter id"
                    value={payment.number}
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
                    placeholder=" dd-mm-yy  00:00 AM"
                    name="time"
                    value={payment.time}
                    onChange={handleInput}
                    required
                  />
                </div>

                <br />
                <button
                  type="submit"
                  className="btn btn-submit"
                  style={{ position: "relative", top: "10em", left: "15em" }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
