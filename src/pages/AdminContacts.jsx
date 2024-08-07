import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { authorizationToken } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`contacts ${data}`);
      setContactData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContactById = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5500/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        getContactsData();
        toast.success("Deleted successfully");
      } else {
        toast.error("Deletion failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredContacts = contactData.filter((contact) =>
    contact.username.toLowerCase().includes(searchQuery.toLowerCase())
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
              Contact us data
              <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearch}
                style={{
                  marginLeft: "1em",
                  marginBottom: "1em",
                  borderRadius: "5px 5px 5px 5px",
                  border: "2px solid black",
                  position: "relative",

                  height: "40px",
                  width: "450px",
                  right: "-25em",
                  top: "-0.3em",
                }}
              />
            </h1>
          </div>
          <div className="container admin-user">
            <table
              className="table-alternate-rows"
              cellSpacing="0"
              style={{
                width: "1000px",
                textAlign: "center",
                fontSize: "14px",
                color: "black",
              }}
            >
              <thead>
                <tr>
                  <th className="row">Name</th>
                  <th className="row">Email</th>
                  <th className="row">Message</th>
                  <th className="row">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact, index) => {
                  const { username, email, message, _id } = contact;
                  return (
                    <tr key={index}>
                      <td className="row">{username}</td>
                      <td className="row">{email}</td>
                      <td className="row">{message}</td>
                      <td className="row">
                        <button onClick={() => deleteContactById(_id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </body>
    </>
  );
};
