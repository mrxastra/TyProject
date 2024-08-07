import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { authorizationToken } = useAuth();
  const { user } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`users ${data}`);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmed) return;
    try {
      const response = await fetch(
        `http://localhost:5500/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`users After delete ${data}`);
      if (response.ok) {
        getAllUsersData();
        toast.success("Deleted successfully");
      } else {
        toast.error("Deletion failed");
      }
    } catch (error) {
      next(error);
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
            <h1 style={{ fontSize: "40px", color: "black" }}>
              Users Registration Data
            </h1>
            <div className="container admin-user">
              <input
                type="text"
                placeholder=" Search by name"
                value={searchQuery}
                onChange={handleSearch}
                style={{
                  borderRadius: "5px 5px 5px 5px",
                  border: "2px solid black",
                  position: "relative",
                  top: "-1.5em",
                  height: "40px",
                  width: "450px",
                  left: "7em",
                }}
              />
            </div>
          </div>

          <table
            className="table-alternate-rows"
            cellSpacing="0"
            style={{
              width: "1000px",
              textAlign: "center",
              fontSize: "14px",
              color: "black",
              position: "relative",
              left: "5em",
            }}
          >
            <thead>
              <tr>
                <th className="row">Name</th>
                <th className="row">Email</th>
                <th className="row">Phone</th>
                <th>Admin</th>

                <th className="row">Update</th>
                <th className="row">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((curUser, index) => (
                <tr key={index}>
                  <td className="row">{curUser.username}</td>
                  <td className="row">{curUser.email}</td>
                  <td className="row">{curUser.phone}</td>
                  <td className="row">{curUser.isAdmin ? "Yes" : "No"}</td>

                  <td className="row">
                    <Link to={`/admin/users/${curUser._id}/edit`}>
                      <button>Edit</button>
                    </Link>
                  </td>
                  <td className="row">
                    <button onClick={() => deleteUser(curUser._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </body>
    </>
  );
};
