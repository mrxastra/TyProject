import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export const AdminPayments = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/admin/payments", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`payments ${data}`);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePaymentById = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Payment form?"
    );
    if (!confirmed) return;
    try {
      const response = await fetch(
        `http://localhost:5500/api/admin/payments/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        getAllUsersData();
        toast.success("Deleted successfully");
      } else {
        toast.error("Deletion failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <body
        className="adminbody"
        style={{ background: "white", position: "relative", top: "-6.5em" }}
      >
        <section className="admin-users-section">
          <div className="container">
            <h1 style={{ fontSize: "40px", color: "black" }}>Payment data</h1>
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearch}
              style={{
                marginBottom: "1em",
                borderRadius: "5px 5px 5px 5px",
                border: "2px solid black",
                position: "relative",
                top: "0.7em",
                height: "40px",
                width: "450px",
              }}
            />
          </div>
          <div className="container admin-user">
            <table
              className="table-alternate-rows"
              cellSpacing="0"
              style={{
                width: "1600px",
                textAlign: "center",
                fontSize: "14px",
                color: "black",
                fontStyle: "italic",
              }}
            >
              <thead>
                <tr>
                  <th className="row">Name</th>
                  <th className="row">Phone Number</th>
                  <th className="row">Payment&nbsp;Method</th>
                  <th className="row">Amount</th>
                  <th className="row">Transaction id</th>
                  <th className="row">Date and time</th>
                  <th>Edit Data</th>
                  <th>Delete Data</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((curUser, index) => (
                  <tr key={index}>
                    <td className="row">{curUser.username}</td>
                    <td className="row">{curUser.phone}</td>
                    <td className="row">{curUser.payment_method}</td>
                    <td className="row">{curUser.amount}</td>
                    <td className="row">{curUser.number}</td>
                    <td className="row">{curUser.time}</td>
                    <td className="row">
                      <Link to={`/admin/payments/${curUser._id}/edit`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                    <td className="row">
                      <button onClick={() => deletePaymentById(curUser._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </body>
    </>
  );
};
