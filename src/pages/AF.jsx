import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { useState } from "react";

export const AdminForm = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();
  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/admin/forms", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`forms ${data}`);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <body className="adminbody">
        <section className="admin-users-section">
          <div className="container">
            <h1 style={{ fontSize: "40px", color: "black" }}>Form data</h1>
          </div>
          <div className="container admin-user">
            <table
              className="table-alternate-rows"
              cellspacing="0"
              //cellspacing="26"

              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "black",
                padding: "40px",
              }}
            >
              <thead>
                <tr>
                  <th>
                    <div className="row1">Type of form</div>
                  </th>
                  <th>
                    <div className="row1">Type of Paitent</div>
                  </th>
                  <th>
                    <div className="row1">Name</div>
                  </th>

                  <th>
                    <div className="row1">Aadhaar Number</div>
                  </th>
                  <th>
                    <div className="row1">Age</div>
                  </th>
                  <th className="row1">Gender</th>
                  <th className="row1">Contact number</th>
                  <th className="row1">Address</th>
                  <th className="row1">Previous Occupation</th>
                  <th className="row1">Chief Complaint</th>
                  <th className="row1">HOPI</th>
                  <th className="row1">Site</th>
                  <th className="row1">Pain Site(left)</th>
                  <th className="row1">Pain Site(Right)</th>

                  <th className="row1">Type</th>
                  <th className="row1">Indicate Pain</th>
                  <th className="row1">Onset</th>
                  <th className="row1">Duration</th>
                  <th className="row1">Progression</th>
                  <th className="row1">Aggrevating Factor</th>
                  <th className="row1">Relieving Factor</th>
                  <th className="row1">Irritability</th>
                </tr>
              </thead>

              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td className="row1">
                      {curUser.PainSiteLeft.map((key, value) => (
                        <div key={value}>
                          {key.Neck && (
                            <>
                              <span>Neck: {key.Neck}</span>
                              <br />
                            </>
                          )}
                          <br />
                          {key["Upper Back"] && (
                            <>
                              <span>Upper Back: {key["Upper Back"]}</span>
                              <br />
                            </>
                          )}
                          <br />
                          {key["Lower Back"] && (
                            <>
                              <span>Upper Back: {key["Lower Back"]}</span>
                              <br />
                            </>
                          )}
                        </div>
                      ))}
                    </td>

                    <td className="row1">{curUser.Name}</td>
                    <td className="row1">{curUser.AadhaarNumber}</td>
                    <td className="row1">{curUser.Type_of_form}</td>
                    <td className="row1">{curUser.Type_of_paitent}</td>
                    <td className="row1">{curUser.Grades_of_Age}</td>
                    <td className="row1">{curUser.Gender}</td>
                    <td className="row1">{curUser.Address}</td>
                    <td className="row1">{curUser.CC}</td>
                    <td className="row1">{curUser.HOPI}</td>
                    <td className="row1">{curUser.Height}</td>
                    <td className="row1">{curUser.Weight}</td>
                    <td className="row1">{curUser.PostureImage}</td>
                    <td className="row1">{curUser.BMI}</td>
                    <td className="row1">{curUser.BP}</td>
                    <td className="row1">{curUser.PR}</td>
                    <td className="row1">{curUser.RR}</td>
                    <td className="row1">{curUser.Pallor}</td>
                    <td className="row1">{curUser.Icterus}</td>
                    <td className="row1">{curUser.Cyanosis}</td>
                    <td className="row1">{curUser.Erythema}</td>
                    <td className="row1">{curUser.Eruptinosa}</td>
                    <td className="row1">{curUser.Gait}</td>
                    <td className="row1">{curUser.Posture}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </section>
      </body>
    </>
  );
};
