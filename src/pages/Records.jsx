import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
export const Records = () => {
  const [users, setUsers] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/adminz/records", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFormsById = async (id) => {
    // Prompt confirmation dialog before deleting
    // If not confirmed, exit the function
    const confirmed = window.confirm(
      "Are you sure you want to delete this form?"
    );
    if (!confirmed) return;
    try {
      const response = await fetch(
        `http://localhost:5500/api/admin/records/delete/${id}`,
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

  const toggleDetails = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredUsers = users.filter(
    (user) =>
      user.Name && user.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <body
        className="adminbody"
        style={{ background: "white", position: "relative" }}
      >
        <section className="admin-users-section">
          <div className="container">
            <h1
              style={{
                fontSize: "40px",
                color: "black",
              }}
            >
              Form data
            </h1>
            <input
              type="text"
              placeholder="  Search forms by name"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                borderRadius: "5px 5px 5px 5px",
                border: "2px solid black",
                position: "relative",
                top: "0.5em",
                height: "40px",
                width: "450px",
              }}
            />
          </div>
          <div className="container admin-user">
            <table
              className="layout-table"
              cellSpacing="0"
              style={{
                color: "black",
                padding: "40px",
                fontSize: "18.5px",
              }}
            >
              <thead>
                <tr>
                  <th>Paitent Names</th>
                  <th>Filled By</th>
                  <th>Date and Time</th>
                  <th>View Data</th>
                  <th>Edit Data</th>
                  <th>Delete Data</th>
                </tr>
              </thead>

              {filteredUsers.map((curUser, index) => {
                const gaitImageUri = curUser.GaitImage
                  ? `http://localhost:5500/${curUser.GaitImage}`
                  : null;
                const postureImageUri = curUser.PostureImage
                  ? `http://localhost:5500/${curUser.PostureImage}`
                  : null;
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{curUser.Name}</td>
                      <td>{curUser.FilledBy_Name}</td>
                      <td>{curUser.DateTime}</td>
                      <th>
                        <button onClick={() => toggleDetails(index)}>
                          View
                        </button>
                      </th>
                      <th>
                        <Link to={`/records/${curUser._id}/edit`}>
                          <button>Edit</button>
                        </Link>
                      </th>
                      <th>
                        <button onClick={() => deleteFormsById(curUser._id)}>
                          Delete
                        </button>
                      </th>
                    </tr>
                    {expandedIndex === index && (
                      <tr>
                        <td
                          colSpan="6"
                          style={{
                            wordSpacing: "2px",
                            textAlign: "left",
                          }}
                        >
                          <div
                            className="row1"
                            style={{ position: "relative", left: "2em" }}
                          >
                            <div className="title">Primary Details</div>
                            <br />
                            <strong>Date and Time :</strong> {curUser.DateTime}
                            <br />
                            <strong>Type of form :</strong>{" "}
                            {curUser.Type_of_form}
                            <br />
                            <strong>Type of Paitent :</strong>{" "}
                            {curUser.Type_of_paitent}
                            <br /> <strong>Name : </strong>
                            {curUser.Name}
                            <br />
                            <strong>Aadhaar Number : </strong>
                            {curUser.AadhaarNumber}
                            <br />
                            <strong>Age : </strong>
                            {curUser.Age}
                            <br />
                            <strong>Gender : </strong>
                            {curUser.Gender}
                            <br />
                            <strong>Contact_no : </strong>
                            {curUser.Contact_no}
                            <br />
                            <strong>Previous Occupation: </strong>
                            {curUser.Previous_Occupation}
                            <br />
                            <strong>Address : </strong>
                            {curUser.Address}
                            <br />
                            <br />
                            <strong>Chief Complaint : </strong>
                            {curUser.Chief_Complaint}
                            <br />
                            <strong>HOPI : </strong>
                            {curUser.HOPI}
                            <br />
                            <strong>Site : </strong>
                            {curUser.Site}
                            <br />
                            <div className="title">Pain: </div>
                            <br />
                            <strong>Pain Site(Left):</strong>
                            {curUser.PainSiteLeft.map((key, value) => (
                              <div key={value}>
                                {key.Neck && (
                                  <>
                                    <span>&nbsp;&nbsp;Neck:{key.Neck}</span>
                                  </>
                                )}
                                {key["Upper Back"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;UpperBack:{key["Upper Back"]}
                                    </span>
                                  </>
                                )}
                                {key["Lower Back"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;LowerBack:{key["Lower Back"]}
                                    </span>
                                  </>
                                )}
                                {key["SIJ"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;SIJ:
                                      {key["SIJ"]}
                                    </span>
                                  </>
                                )}
                                {key["Shoulder"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Shoulder:
                                      {key["Shoulder"]}
                                    </span>
                                  </>
                                )}
                                {key["Elbow"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Elbow:
                                      {key["Elbow"]}
                                    </span>
                                  </>
                                )}
                                {key["Hip"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Hip:
                                      {key["Hip"]}
                                    </span>
                                  </>
                                )}
                                {key["Knee"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Knee:
                                      {key["Knee"]}
                                    </span>
                                  </>
                                )}
                                {key["Foot"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Foot:
                                      {key["Foot"]}
                                    </span>
                                  </>
                                )}
                                {key["Ankle"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Ankle:
                                      {key["Ankle"]}
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                            <br />
                            <strong>Pain Site(Right): </strong>
                            {curUser.PainSiteRight.map((key, value) => (
                              <div key={value}>
                                {key.Neck && (
                                  <>
                                    <span>&nbsp;&nbsp;Neck:{key.Neck}</span>
                                  </>
                                )}
                                {key["Upper Back"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;UpperBack:{key["Upper Back"]}
                                    </span>
                                  </>
                                )}
                                {key["Lower Back"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;LowerBack:{key["Lower Back"]}
                                    </span>
                                  </>
                                )}
                                {key["SIJ"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;SIJ:
                                      {key["SIJ"]}
                                    </span>
                                  </>
                                )}
                                {key["Shoulder"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Shoulder:
                                      {key["Shoulder"]}
                                    </span>
                                  </>
                                )}
                                {key["Elbow"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Elbow:
                                      {key["Elbow"]}
                                    </span>
                                  </>
                                )}
                                {key["Hip"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Hip:
                                      {key["Hip"]}
                                    </span>
                                  </>
                                )}
                                {key["Knee"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Knee:
                                      {key["Knee"]}
                                    </span>
                                  </>
                                )}
                                {key["Foot"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Foot:
                                      {key["Foot"]}
                                    </span>
                                  </>
                                )}
                                {key["Ankle"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Ankle:
                                      {key["Ankle"]}
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                            <br />
                            <strong>Type : </strong>
                            {curUser.Type}
                            <br />
                            <br />
                            <strong>Indicate Pain: </strong>
                            {curUser.IndicatePain.map((key, value) => (
                              <div key={value}>
                                {key.Neck && (
                                  <>
                                    <span>&nbsp;&nbsp;Neck:{key.Neck}</span>
                                  </>
                                )}
                                {key["Upper Back"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;UpperBack:{key["Upper Back"]}
                                    </span>
                                  </>
                                )}
                                {key["Lower Back"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;LowerBack:{key["Lower Back"]}
                                    </span>
                                  </>
                                )}
                                {key["SIJ"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;SIJ:
                                      {key["SIJ"]}
                                    </span>
                                  </>
                                )}
                                {key["Shoulder Girdle"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Shoulder Girdle:
                                      {key["Shoulder Girdle"]}
                                    </span>
                                  </>
                                )}
                                {key["Elbow"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Elbow:
                                      {key["Elbow"]}
                                    </span>
                                  </>
                                )}
                                {key["Wrist"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Wrist:
                                      {key["Wrist"]}
                                    </span>
                                  </>
                                )}
                                {key["Hand"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Hand:
                                      {key["Hand"]}
                                    </span>
                                  </>
                                )}
                                {key["SIJ"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;SIJ:
                                      {key["SIJ"]}
                                    </span>
                                  </>
                                )}
                                {key["Hip"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Hip:
                                      {key["Hip"]}
                                    </span>
                                  </>
                                )}
                                {key["Knee"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;SIJ:
                                      {key["Knee"]}
                                    </span>
                                  </>
                                )}
                                {key["Ankle"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Ankle:
                                      {key["Ankle"]}
                                    </span>
                                  </>
                                )}
                                {key["Foot"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Foot:
                                      {key["Foot"]}
                                    </span>
                                  </>
                                )}
                                <br />
                                {key["No Pain"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;No Pain:
                                      {key["No Pain"]}
                                    </span>
                                  </>
                                )}
                                {key["Non-specific Pain"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Non-specific Pain:
                                      {key["Non-specific Pain"]}
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                            <br />
                            <strong>Onset : </strong>
                            {curUser.Onset}
                            <br />
                            <strong>Duration : </strong>
                            {curUser.Duration}
                            <br />
                            <strong>Progression : </strong>
                            {curUser.Progression}
                            <br />
                            <strong>Aggravating Factors : </strong>
                            {curUser.Aggravating_Factors}
                            <br />
                            <strong>Relieving Factors :</strong>
                            {curUser.Relieving_Factors}
                            <br />
                            <strong>Diurnal Variation : </strong>
                            {curUser.Diurnal_Variation}
                            <br />
                            <strong>Irritability : </strong>
                            {curUser.Irritability}
                            <br />
                            <strong>VAS : </strong>
                            {curUser.vas}
                            <br />
                            <br />
                            <div className="title">NRS </div>
                            <br />
                            <strong>NRS Neck: </strong>
                            {curUser.NRSNeck.map((key, value) => (
                              <div key={value}>
                                {key["At rest"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;At Rest:{key["At rest"]}
                                    </span>
                                  </>
                                )}
                                {key["On Activity"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;On Activity:
                                      {key["On Activity"]}
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                            <br />
                            <strong>NRS UpperBack: </strong>
                            {curUser.NRSUpperBack.map((key, value) => (
                              <div key={value}>
                                {key["At rest"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;At Rest:{key["At rest"]}
                                    </span>
                                  </>
                                )}
                                {key["On Activity"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;On Activity:
                                      {key["On Activity"]}
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                            <br />
                            <strong>NRS LowerBack: </strong>
                            {curUser.NRSLowBack.map((key, value) => (
                              <div key={value}>
                                {key["At rest"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;At Rest:{key["At rest"]}
                                    </span>
                                  </>
                                )}
                                {key["On Activity"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;On Activity:
                                      {key["On Activity"]}
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                            <br />
                            <strong>NRS Hip: </strong>
                            {curUser.NRSHip.map((key, value) => (
                              <div key={value}>
                                {key["At rest"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;At Rest:{key["At rest"]}
                                    </span>
                                  </>
                                )}
                                {key["On Activity"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;On Activity:
                                      {key["On Activity"]}
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                            <br />
                            <strong>NRS Knee: </strong>
                            {curUser.NRSKnee.map((key, value) => (
                              <div key={value}>
                                {key["At rest"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;At Rest:{key["At rest"]}
                                    </span>
                                  </>
                                )}
                                {key["On Activity"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;On Activity:
                                      {key["On Activity"]}
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                            <br />
                            <strong>NRS Ankle And Foot: </strong>
                            {curUser.NRSAnkleAndFoot.map((key, value) => (
                              <div key={value}>
                                {key["At rest"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;At Rest:{key["At rest"]}
                                    </span>
                                  </>
                                )}
                                {key["On Activity"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;On Activity:
                                      {key["On Activity"]}
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                            <br />
                            <br />
                            <br />
                            <div className="title">Medical History </div> <br />
                            <br /> {curUser.Medical_History}
                            <br />
                            <br />
                            <div className="title">Surgical History </div>{" "}
                            <br />
                            <br />
                            {curUser.Surgical_History}
                            <br />
                            <br />
                            <div className="title">Personal History </div>{" "}
                            <br />
                            <br />
                            <strong>Sleep : </strong>
                            {curUser.Sleep}
                            <br />
                            <strong>Appetite : </strong>
                            {curUser.Appetite}
                            <br />
                            <strong>Diet : </strong>
                            {curUser.Diet}
                            <br />
                            <strong>Bowel : </strong>
                            {curUser.Bowel}
                            <br />
                            <strong>Bladder : </strong>
                            {curUser.Bladder}
                            <br />
                            <strong>Menstrual History : </strong>
                            {curUser.Menstrual_History}
                            <br />
                            <strong>GPLAD : </strong>
                            {curUser.GPLAD}
                            <br />
                            <br />
                            <strong>G1 : </strong>
                            {curUser.G1}
                            <strong>
                              <br />
                              G2 :{" "}
                            </strong>
                            {curUser.G2}
                            <strong>
                              <br />
                              G3 :{" "}
                            </strong>
                            {curUser.G3}
                            <strong>
                              <br />
                              G4 :{" "}
                            </strong>
                            {curUser.G4}
                            <br />
                            <br />
                            <strong>Height : </strong>
                            {curUser.Height}
                            <strong>
                              <br />
                              Weight :{" "}
                            </strong>
                            {curUser.Weight}
                            <strong>
                              <br />
                              BMI :{" "}
                            </strong>
                            {curUser.BMI}
                            <br />
                            <br />
                            <strong>BP : </strong>
                            {curUser.BP}
                            <strong>
                              <br />
                              PR :{" "}
                            </strong>
                            {curUser.PR}
                            <strong>
                              <br />
                              RR:{" "}
                            </strong>
                            {curUser.RR}
                            <br />
                            <br />
                            <strong>Pallor : </strong>
                            {curUser.Pallor}
                            <strong>
                              <br />
                              Icterus :{" "}
                            </strong>
                            {curUser.Icterus}
                            <strong>
                              <br />
                              Cyanosis :{" "}
                            </strong>
                            {curUser.Cyanosis}
                            <br />
                            <br />
                            <strong> Clubbing: </strong>
                            {curUser.Clubbing}
                            <strong>
                              <br />
                              Erythema:{" "}
                            </strong>
                            {curUser.Erythema}
                            <strong>
                              <br />
                              Eruptinosa :{" "}
                            </strong>
                            {curUser.Eruptinosa}
                            <br />
                            <br />
                            <strong>
                              <br />
                              Lymphadenopathy :{" "}
                            </strong>
                            {curUser.Lymphadenopathy}
                            <strong>
                              <br />
                              Oedema :{" "}
                            </strong>
                            {curUser.Oedema}
                            <br />
                            <br />
                            <div className="title">On Observation:</div>
                            <br />
                            <br />
                            <strong> Swelling : </strong>
                            {curUser.Swelling}
                            <strong>
                              <br /> Wound Observation :{" "}
                            </strong>
                            {curUser.WoundObservation}
                            <strong>
                              <br />
                              Scars :{" "}
                            </strong>
                            {curUser.Scars}
                            <br />
                            <br />
                            <div className="title">On Palpation</div>
                            <br />
                            <br />
                            <strong> Tenderness : </strong>
                            {curUser.Tenderness}
                            <strong>
                              <br />
                              Spasm :{" "}
                            </strong>
                            {curUser.Spasm}
                            <strong>
                              <br />
                              Warmth :{" "}
                            </strong>
                            {curUser.Warmth}
                            <strong>
                              {" "}
                              <br />
                              Swelling :{" "}
                            </strong>
                            {curUser.SwellinG}
                            <strong>
                              <br />
                              On Auscultation :{" "}
                            </strong>
                            {curUser.OnAuscultation}
                            <br />
                            <br />
                            <div className="title">
                              Motor Examination(Range of Motion)
                            </div>
                            <br />
                            <br />
                            {curUser.MotorExamination.map((key, value) => (
                              <div key={value}>
                                {key.Cervical && (
                                  <>
                                    <span>
                                      <strong>Cervical : </strong>{" "}
                                      {key.Cervical}
                                    </span>
                                  </>
                                )}
                                {key["Shoulder"] && (
                                  <>
                                    <span>
                                      <br />
                                      <strong>Shoulder : </strong>
                                      {key["Shoulder"]}
                                    </span>
                                  </>
                                )}
                                {key["Elbow"] && (
                                  <>
                                    <span>
                                      <br />
                                      <strong>Elbow : </strong>
                                      {key["Elbow"]}
                                    </span>
                                  </>
                                )}
                                {key["Wrist"] && (
                                  <>
                                    <span>
                                      <br />
                                      <strong>Wrist : </strong>
                                      {key["Wrist"]}
                                    </span>
                                  </>
                                )}
                                {key["Hand"] && (
                                  <>
                                    <span>
                                      <br />
                                      <strong>Hand : </strong>
                                      {key["Hand"]}
                                    </span>
                                  </>
                                )}
                                {key["Trunk"] && (
                                  <>
                                    <span>
                                      <br />
                                      <strong>Trunk : </strong>
                                      {key["Trunk"]}
                                    </span>
                                  </>
                                )}

                                {key["Hip"] && (
                                  <>
                                    <span>
                                      <br />
                                      <strong>Hip :</strong>
                                      {key["Hip"]}
                                    </span>
                                  </>
                                )}
                                {key["Knee"] && (
                                  <>
                                    <span>
                                      <br />
                                      <strong>Knee : </strong>
                                      {key["Knee"]}
                                    </span>
                                  </>
                                )}

                                {key["Ankle"] && (
                                  <>
                                    <span>
                                      <br />
                                      <strong>Ankle :</strong>
                                      {key["Ankle"]}
                                    </span>
                                  </>
                                )}
                                <br />
                                <br />
                              </div>
                            ))}
                            <strong> Cervical Range : </strong>
                            {curUser.CervicalRange}
                            <strong>&nbsp;&nbsp; ShoulderRange :</strong>
                            {curUser.ShoulderRange}
                            <strong>&nbsp;&nbsp;ElbowRange : </strong>
                            {curUser.ElbowRange}
                            <br />
                            <br />
                            <strong> Wrist Range : </strong>
                            {curUser.WristRange}
                            <strong>&nbsp;&nbsp; Hand Range :</strong>
                            {curUser.HandRange}
                            <strong>&nbsp;&nbsp;Trunk Range : </strong>
                            {curUser.TrunkRange}
                            <br />
                            <br />
                            <strong> Hip Range : </strong>
                            {curUser.HipRange}
                            <strong>&nbsp;&nbsp; Knee Range :</strong>
                            {curUser.KneeRange}
                            <strong>&nbsp;&nbsp;Ankle Range : </strong>
                            {curUser.AnkleRange}
                            <br />
                            <br />
                            <div className="title">Strength</div>
                            <br />
                            <strong>Strength(Right): </strong>
                            {curUser.StrengthR.map((key, value) => (
                              <div key={value}>
                                {key["Shoulderflexors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Shoulder Flexors :{key["Shoulderflexors"]}
                                    </span>
                                  </>
                                )}
                                {key["ShouldExtensors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Shoulder Extensors :
                                      {key["ShouldExtensors"]}
                                    </span>
                                  </>
                                )}
                                {key["ShoulderAbductors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Shoulder Abductors :
                                      {key["ShoulderAbductors"]}
                                    </span>
                                  </>
                                )}
                                {key["ShoulderIR"] && (
                                  <>
                                    <span>
                                      <br />
                                      Shoulder IR :{key["ShoulderIR"]}
                                    </span>
                                  </>
                                )}
                                {key["ShoulderER"] && (
                                  <>
                                    <span>
                                      <br />
                                      Shoulder ER :{key["ShoulderER"]}
                                    </span>
                                  </>
                                )}
                                {key["ElbowFlexors"] && (
                                  <>
                                    <span>
                                      <br />
                                      ElbowFlexors :{key["ElbowFlexors"]}
                                    </span>
                                  </>
                                )}
                                {key["WristExtensors"] && (
                                  <>
                                    <span>
                                      <br />
                                      WristExtensors :{key["WristExtensors"]}
                                    </span>
                                  </>
                                )}
                                {key["WristRadialDeviatora"] && (
                                  <>
                                    <span>
                                      <br />
                                      Wrist Radial Deviatora :
                                      {key["WristRadialDeviatora"]}
                                    </span>
                                  </>
                                )}
                                {key["WristUlnarDeviatora"] && (
                                  <>
                                    <span>
                                      <br />
                                      Wrist UlnarDeviatora :
                                      {key["WristUlnarDeviatora"]}
                                    </span>
                                  </>
                                )}

                                {key["HipFlexors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Hip Flexors :{key["HipFlexors"]}
                                    </span>
                                  </>
                                )}
                                {key["HipExtensors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Hip Extensors :{key["HipExtensors"]}
                                    </span>
                                  </>
                                )}
                                {key["HipIR"] && (
                                  <>
                                    <span>
                                      <br />
                                      Hip IR :{key["HipIR"]}
                                    </span>
                                  </>
                                )}
                                {key["HipER"] && (
                                  <>
                                    <span>
                                      <br />
                                      HiP ER :{key["HipER"]}
                                    </span>
                                  </>
                                )}
                                {key["KneeFlexors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Knee Flexors :{key["KneeFlexors"]}
                                    </span>
                                  </>
                                )}
                                {key["KneeExtensors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Knee Extensors :{key["KneeExtensors"]}
                                    </span>
                                  </>
                                )}
                                {key["Dorsiflexors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Dorsiflexors :{key["Dorsiflexors"]}
                                    </span>
                                  </>
                                )}
                                {key["Plantarflexors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Plantarflexors :{key["Plantarflexors"]}
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                            <br />
                            <strong>Strength(Left): </strong>
                            {curUser.StrengthL.map((key, value) => (
                              <div key={value}>
                                {key["Shoulderflexors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Shoulder Flexors:
                                      {key["Shoulderflexors"]}
                                    </span>
                                  </>
                                )}
                                {key["ShouldExtensors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Shoulder Extensors:
                                      {key["ShouldExtensors"]}
                                    </span>
                                  </>
                                )}
                                {key["ShoulderAbductors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Shoulder Abductors:
                                      {key["ShoulderAbductors"]}
                                    </span>
                                  </>
                                )}
                                {key["ShoulderIR"] && (
                                  <>
                                    <span>
                                      <br />
                                      Shoulder IR:
                                      {key["ShoulderIR"]}
                                    </span>
                                  </>
                                )}
                                {key["ShoulderER"] && (
                                  <>
                                    <span>
                                      <br />
                                      Shoulder ER:
                                      {key["ShoulderER"]}
                                    </span>
                                  </>
                                )}
                                {key["ElbowFlexors"] && (
                                  <>
                                    <span>
                                      <br />
                                      ElbowFlexors :{key["ElbowFlexors"]}
                                    </span>
                                  </>
                                )}
                                {key["WristExtensors"] && (
                                  <>
                                    <span>
                                      <br />
                                      WristExtensors:
                                      {key["WristExtensors"]}
                                    </span>
                                  </>
                                )}
                                {key["WristRadialDeviatora"] && (
                                  <>
                                    <span>
                                      <br />
                                      Wrist Radial Deviatora:
                                      {key["WristRadialDeviatora"]}
                                    </span>
                                  </>
                                )}
                                {key["WristUlnarDeviatora"] && (
                                  <>
                                    <span>
                                      <br />
                                      Wrist UlnarDeviatora:
                                      {key["WristUlnarDeviatora"]}
                                    </span>
                                  </>
                                )}

                                {key["HipFlexors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Hip Flexors:
                                      {key["HipFlexors"]}
                                    </span>
                                  </>
                                )}
                                {key["HipExtensors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Hip Extensors:
                                      {key["HipExtensors"]}
                                    </span>
                                  </>
                                )}
                                {key["HipIR"] && (
                                  <>
                                    <span>
                                      <br />
                                      Hip IR:
                                      {key["HipIR"]}
                                    </span>
                                  </>
                                )}
                                {key["HipER"] && (
                                  <>
                                    <span>
                                      <br />
                                      HiP ER:
                                      {key["HipER"]}
                                    </span>
                                  </>
                                )}
                                {key["KneeFlexors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Knee Flexors:
                                      {key["KneeFlexors"]}
                                    </span>
                                  </>
                                )}
                                {key["KneeExtensors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Knee Extensors:
                                      {key["KneeExtensors"]}
                                    </span>
                                  </>
                                )}
                                {key["Dorsiflexors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Dorsiflexors:
                                      {key["Dorsiflexors"]}
                                    </span>
                                  </>
                                )}
                                {key["Plantarflexors"] && (
                                  <>
                                    <span>
                                      <br />
                                      Plantarflexors:
                                      {key["Plantarflexors"]}
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                            <br />
                            <br />
                            <strong>Tightness: </strong>
                            {curUser.Tightness.map((key, value) => (
                              <div key={value}>
                                {key["Trapezius"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Trapezius:
                                      {key["Trapezius"]}
                                    </span>
                                  </>
                                )}
                                {key["DLF"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;DLF:
                                      {key["DLF"]}
                                    </span>
                                  </>
                                )}
                                {key["Iliopsoas"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Iliopsoas:
                                      {key["Iliopsoas"]}
                                    </span>
                                  </>
                                )}
                                {key["Hams"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;Hams:
                                      {key["Hams"]}
                                    </span>
                                  </>
                                )}
                                {key["TA"] && (
                                  <>
                                    <span>
                                      &nbsp;&nbsp;TA:
                                      {key["TA"]}
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                            <br />
                            <strong>VoluntaryControl :</strong>
                            {curUser.VoluntaryControl}
                            <br />
                            <strong>Reflexes :</strong>
                            {curUser.Reflexes}
                            <br />
                            <br />
                            <div className="title">
                              Neurological Assesment:{" "}
                            </div>
                            <br />
                            {curUser.NeurogicalAssessment.map((key, value) => (
                              <div key={value}>
                                {key["Olfactory Nerve"] && (
                                  <>
                                    <span>
                                      <br />
                                      Olfactory Nerve :{key["Olfactory Nerve"]}
                                      <br />
                                    </span>
                                  </>
                                )}
                                {key["Optic Nerve"] && (
                                  <>
                                    <span>
                                      <br />
                                      Optic Nerve :{key["Optic Nerve"]}
                                      <br />
                                    </span>
                                  </>
                                )}
                                {key["Occulomotor Nerve"] && (
                                  <>
                                    <span>
                                      <br />
                                      Occulomotor Nerve :
                                      {key["Occulomotor Nerve"]}
                                      <br />
                                    </span>
                                  </>
                                )}
                                {key["Trochlear Nerve"] && (
                                  <>
                                    <span>
                                      <br />
                                      Trochlear Nerve :{
                                        key["Trochlear Nerve"]
                                      }{" "}
                                      <br />
                                    </span>
                                  </>
                                )}
                                {key["Trigeminamal Nerve"] && (
                                  <>
                                    <span>
                                      <br />
                                      Trigeminamal Nerve :
                                      {key["Trigeminamal Nerve"]} <br />
                                    </span>
                                  </>
                                )}
                                {key["Abducens Nerve"] && (
                                  <>
                                    <span>
                                      <br />
                                      Abducens Nerve :{
                                        key["Abducens Nerve"]
                                      }{" "}
                                      <br />
                                    </span>
                                  </>
                                )}
                                {key["Facial Nerve"] && (
                                  <>
                                    <span>
                                      <br />
                                      Facial Nerve :{key["Facial Nerve"]} <br />
                                    </span>
                                  </>
                                )}
                                {key["Vestibulocochlear Nerve"] && (
                                  <>
                                    <span>
                                      <br />
                                      Vestibulocochlear Nerve :
                                      {key["Vestibulocochlear Nerve"]} <br />
                                    </span>
                                  </>
                                )}
                                {key["WristUlnarDeviatora"] && (
                                  <>
                                    <span>
                                      <br />
                                      Wrist UlnarDeviatora :
                                      {key["WristUlnarDeviatora"]}
                                      <br />
                                    </span>
                                  </>
                                )}

                                {key["Glossopharyngeal Nerve"] && (
                                  <>
                                    <span>
                                      <br />
                                      Glossopharyngeal Nerve :
                                      {key["Glossopharyngeal Nerve"]}
                                      <br />
                                    </span>
                                  </>
                                )}
                                {key["Vagus Nerve"] && (
                                  <>
                                    <span>
                                      <br />
                                      Vagus Nerve :{key["Vagus Nerve"]}
                                      <br />
                                    </span>
                                  </>
                                )}
                                {key["Spinal Accesory Nerve"] && (
                                  <>
                                    <span>
                                      <br />
                                      Spinal Accesory Nerve :
                                      {key["Spinal Accesory Nerve"]} <br />
                                    </span>
                                  </>
                                )}
                                {key["Hypoglossal Nerve"] && (
                                  <>
                                    <span>
                                      <br />
                                      Hypoglossal Nerve :
                                      {key["Hypoglossal Nerve"]} <br />
                                    </span>
                                  </>
                                )}

                                {key["Sensory Nerve"] && (
                                  <>
                                    <span>
                                      <br />
                                      Sensory Nerve :{key["Sensory Nerve"]}{" "}
                                      <br />
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                            <br />
                            <div className="title"></div>
                            <br />
                            <br />
                            <strong>Special Tests(Positive) :</strong>
                            {curUser.Special_Tests_Positive}
                            <br />
                            <br />
                            <strong>Special Tests(Negative) :</strong>
                            {curUser.Special_Tests_Negative}
                            <br />
                            <br />
                            <strong>Geriatric Depression Scale:</strong>
                            {curUser.Geriatric_Depression_Scale}
                            <br />
                            <strong>SF 36 Score :</strong>
                            {curUser.SF_36_Score}
                            <br />
                            <strong>Instrumental_Activity:</strong>
                            {curUser.Instrumental_Activity}
                            <br />
                            <strong>TUG:</strong>
                            {curUser.TUG}
                            <br />
                            <strong>KuppuSwamy Scale:</strong>
                            {curUser.KuppuSwamy_Scale}
                            <br />
                            <strong>Fall Efficacy Scale:</strong>
                            {curUser.Fall_Efficacy_Scale}
                            <br />
                            <strong>Moca Scale Score:</strong>
                            {curUser.Moca_Scale_Score}
                            <br />
                            <strong>Activity of Daily Living:</strong>
                            {curUser.Activity_of_Daily_Living}
                            <br />
                            <br />
                            <strong>Deformatives:</strong>
                            {curUser.Deformities}
                            <br />
                            <br />
                            <div className="title">
                              {" "}
                              Lower Extremity Function Scale{" "}
                            </div>
                            <br />
                            <br />
                            {curUser.LowerExtremityFunctionScale.map(
                              (key, value) => (
                                <div key={value}>
                                  {key[
                                    "Any of your usual work,housework or school activities"
                                  ] && (
                                    <>
                                      <span>
                                        <strong>
                                          Any of your usual work,housework or
                                          school activities :
                                        </strong>
                                        {
                                          key[
                                            "Any of your usual work,housework or school activities"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Your usual hobbies,recreational or sporting activities"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Your usual hobbies,recreational or
                                          sporting activities :
                                        </strong>
                                        {
                                          key[
                                            "Your usual hobbies,recreational or sporting activities"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key["Getting into or out of the bath"] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Getting into or out of the bath :
                                        </strong>
                                        {key["Getting into or out of the bath"]}
                                      </span>
                                    </>
                                  )}
                                  {key["Walking between rooms"] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>Walking between rooms :</strong>
                                        {key["Walking between rooms"]}
                                      </span>
                                    </>
                                  )}
                                  {key["Putting on your shoes or socks"] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          {" "}
                                          Putting on your shoes or socks :
                                        </strong>
                                        {key["Putting on your shoes or socks"]}
                                      </span>
                                    </>
                                  )}
                                  {key["Squatting"] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>Squatting:</strong>
                                        {key["Squatting"]}
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Lifting an object,like a bag of groceries from the floor"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Lifting an object,like a bag of
                                          groceries from the floor :
                                        </strong>
                                        {
                                          key[
                                            "Lifting an object,like a bag of groceries from the floor"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Performing light activities around your home"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Performing light activities around
                                          your home :
                                        </strong>
                                        {
                                          key[
                                            "Performing light activities around your home"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Performing heavy activities around your home"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          {" "}
                                          <strong>
                                            Performing heavy activities around
                                            your home:{" "}
                                          </strong>
                                        </strong>

                                        {
                                          key[
                                            "Performing heavy activities around your home"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Getting into or out of car/rickshaw"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Getting into or out of car/rickshaw :
                                        </strong>
                                        {
                                          key[
                                            "Getting into or out of car/rickshaw"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key["Getting onto or off a 2-wheeler"] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Getting onto or off a 2-wheeler :
                                        </strong>
                                        {key["Getting onto or off a 2-wheeler"]}
                                      </span>
                                    </>
                                  )}
                                  {key["Walking 2 blocks/2 chowks"] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Walking 2 blocks/2 chowks :
                                        </strong>
                                        {key["Walking 2 blocks/2 chowks"]}
                                      </span>
                                    </>
                                  )}
                                  {key["Walking a mile"] && (
                                    <>
                                      <span>
                                        <strong>
                                          <br /> Walking a mile :
                                        </strong>
                                        {key["Walking a mile"]}
                                      </span>
                                    </>
                                  )}
                                  {key["Going up or down 10 stairs"] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Going up or down 10 stairs :
                                        </strong>
                                        {key["Going up or down 10 stairs"]}
                                      </span>
                                    </>
                                  )}
                                  {key["Standing for 1 hour"] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong> Standing for 1 hour :</strong>
                                        {key["Standing for 1 hour"]}
                                      </span>
                                    </>
                                  )}
                                  {key["Sitting for 1 hour"] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>Sitting for 1 hour :</strong>
                                        {key["Sitting for 1 hour"]}
                                      </span>
                                    </>
                                  )}
                                  {key["Running on Even Ground"] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Running on Even Ground :
                                        </strong>
                                        {key["Running on Even Ground"]}
                                      </span>
                                    </>
                                  )}
                                  {key["Running on Uneven Ground"] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Running on Uneven Ground :
                                        </strong>
                                        {key["Running on Uneven Ground"]}
                                      </span>
                                    </>
                                  )}
                                  {key["Making sharp turns while running"] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Making sharp turns while running :
                                        </strong>
                                        {
                                          key[
                                            "Making sharp turns while running"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key["Hopping"] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>Hopping :</strong>
                                        {key["Hopping"]}
                                      </span>
                                    </>
                                  )}
                                  {key["Rolling over in bed"] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong> Rolling over in bed :</strong>
                                        {key["Rolling over in bed"]}
                                      </span>
                                    </>
                                  )}
                                  {key[""] && (
                                    <>
                                      <span>
                                        <br /> :{key[""]}
                                      </span>
                                    </>
                                  )}
                                  {key[""] && (
                                    <>
                                      <span>
                                        <br /> :{key[""]}
                                      </span>
                                    </>
                                  )}
                                </div>
                              )
                            )}
                            <br />
                            <br />
                            <div className="title">
                              {" "}
                              The Osteoporosis Knowledge Assessment Tool:{" "}
                            </div>
                            <br />
                            {curUser.TheOsteoporosisKnowledgeAssessmentTool.map(
                              (key, value) => (
                                <div key={value}>
                                  {key[
                                    "Osteoporosis leads to an increase risk of bone fractures"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Osteoporosis leads to an increase risk
                                          of bone fractures :
                                        </strong>{" "}
                                        {
                                          key[
                                            "Osteoporosis leads to an increase risk of bone fractures"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Osteoporosis usually causes symptoms(eg.pain)before fractures occur"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Osteoporosis usually causes
                                          symptoms(eg.pain)before fractures
                                          occur :
                                        </strong>{" "}
                                        {
                                          key[
                                            "Osteoporosis usually causes symptoms(eg.pain)before fractures occur"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Having a higher peak bone mass at the end of childhood gives no protection against the development of osteoporosis in later life"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Having a higher peak bone mass at the
                                          end of childhood gives no protection
                                          against the development <br />
                                          of osteoporosis in later life :
                                        </strong>{" "}
                                        {
                                          key[
                                            "Having a higher peak bone mass at the end of childhood gives no protection against the development of osteoporosis in later life"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Osteoporosis is more common in men"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Osteoporosis is more common in men :
                                        </strong>{" "}
                                        {
                                          key[
                                            "Osteoporosis is more common in men"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[""] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>:</strong> {key[""]}
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Cigarette smoking can contribute to osteoporosis"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Cigarette smoking can contribute to
                                          osteoporosis :
                                        </strong>{" "}
                                        {
                                          key[
                                            "Cigarette smoking can contribute to osteoporosis"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "White women are at highest risk of fracture as compared to other races"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          White women are at highest risk of
                                          fracture as compared to other races :
                                        </strong>{" "}
                                        {
                                          key[
                                            "White women are at highest risk of fracture as compared to other races"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "A fall is just as important as low bone strength in causing fractures"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          A fall is just as important as low
                                          bone strength in causing fractures :
                                        </strong>{" "}
                                        {
                                          key[
                                            "A fall is just as important as low bone strength in causing fractures"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "By age 80,The majority of women have osteoporosis"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          By age 80,The majority of women have
                                          osteoporosis :
                                        </strong>{" "}
                                        {
                                          key[
                                            "By age 80,The majority of women have osteoporosis"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "From age 50,Most women can expect atleast one fracture before they die"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          From age 50,Most women can expect
                                          atleast one fracture before they die :
                                        </strong>{" "}
                                        {
                                          key[
                                            "From age 50,Most women can expect atleast one fracture before they die"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Any type of physical activity is beneficial for osteoporosis"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Any type of physical activity is
                                          beneficial for osteoporosis :
                                        </strong>{" "}
                                        {
                                          key[
                                            "Any type of physical activity is beneficial for osteoporosis"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "It is easy to tell wheather I am at risk of osteoporosis by my clinical risk factor"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          It is easy to tell wheather I am at
                                          risk of osteoporosis by my clinical
                                          risk factor :
                                        </strong>{" "}
                                        {
                                          key[
                                            "It is easy to tell wheather I am at risk of osteoporosis by my clinical risk factor"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Family history of osteoporosis strongly predisposes a person to osteoporosis"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Family history of osteoporosis
                                          strongly predisposes a person to
                                          osteoporosis :
                                        </strong>{" "}
                                        {
                                          key[
                                            "Family history of osteoporosis strongly predisposes a person to osteoporosis"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "An adequate calcium intake can be achieved from two glasses of milk a day"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          An adequate calcium intake can be
                                          achieved from two glasses of milk a
                                          day :
                                        </strong>{" "}
                                        {
                                          key[
                                            "An adequate calcium intake can be achieved from two glasses of milk a day"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Sardines and broccoli are good sources of calcium for people who cannot take dairy products"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Sardines and broccoli are good sources
                                          of calcium for people who cannot take
                                          dairy products :
                                        </strong>{" "}
                                        {
                                          key[
                                            "Sardines and broccoli are good sources of calcium for people who cannot take dairy products"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Calcium supplements alone can prevent bone loss"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Calcium supplements alone can prevent
                                          bone loss :
                                        </strong>{" "}
                                        {
                                          key[
                                            "Calcium supplements alone can prevent bone loss"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Alcohol in moderation has little effect on osteoporosis"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Alcohol in moderation has little
                                          effect on osteoporosis :
                                        </strong>{" "}
                                        {
                                          key[
                                            "Alcohol in moderation has little effect on osteoporosis"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "A high salt intake is a risk factor for osteoporosis"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          A high salt intake is a risk factor
                                          for osteoporosis:
                                        </strong>{" "}
                                        {
                                          key[
                                            "A high salt intake is a risk factor for osteoporosis"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "There is small amount of bone loss in the ten years following the onset of menopause"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          There is small amount of bone loss in
                                          the ten years following the onset of
                                          menopause :
                                        </strong>{" "}
                                        {
                                          key[
                                            "There is small amount of bone loss in the ten years following the onset of menopause"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "Hormone therapy prevents further bone loss at any age after menopause"
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          Hormone therapy prevents further bone
                                          loss at any age after menopause :
                                        </strong>{" "}
                                        {
                                          key[
                                            "Hormone therapy prevents further bone loss at any age after menopause"
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                  {key[
                                    "There are no effective treatments for osteoporosis available in India."
                                  ] && (
                                    <>
                                      <span>
                                        <br />
                                        <strong>
                                          There are no effective treatments for
                                          osteoporosis available in India :
                                        </strong>{" "}
                                        {
                                          key[
                                            "There are no effective treatments for osteoporosis available in India."
                                          ]
                                        }
                                      </span>
                                    </>
                                  )}
                                </div>
                              )
                            )}
                            <br />
                            <div className="title"></div>
                            <br />
                            <br />
                            <strong>Six Minute Walk Test :</strong>{" "}
                            {curUser.SixMinuteWalkTest}
                            <br />
                            <br />
                            <strong>Grade_of_Dyspnoea :</strong>{" "}
                            {curUser.Grade_of_Dyspnoea}
                            <br />
                            <br />
                            <div className="title">Posture Image:</div>
                            <br />
                            <br />
                            {postureImageUri ? (
                              <>
                                <img
                                  src={postureImageUri}
                                  alt="Posture Image"
                                  style={{ height: "600px", width: "600px" }}
                                />
                                <br />
                                <strong>Posture Image path: </strong>
                                {curUser.PostureImage}
                              </>
                            ) : (
                              <strong>No posture image found</strong>
                            )}
                            <br />
                            <br />
                            <div className="title">Gait Video</div>
                            <br />
                            <br />
                            {gaitImageUri ? (
                              <video
                                controls
                                style={{ height: "500px", width: "500px" }}
                              >
                                <source src={gaitImageUri} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <strong>No gait video found</strong>
                            )}
                            <br />
                            <br />
                            {gaitImageUri && (
                              <>
                                <strong>Path:</strong>
                                <br />
                                {curUser.GaitImage}
                                <br />
                                <br />
                              </>
                            )}
                            <div className="title">Additional Remarks :</div>
                            <br />
                            <br />
                            {curUser.Additional_remarks}
                            <br />
                            <br />
                            <div className="title">End</div>
                          </div>
                          <br />
                          <br /> <strong>Form filled By : </strong>
                          {curUser.FilledBy_Name}
                          <br />
                          <br />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </table>
          </div>
        </section>
      </body>
    </>
  );
};
