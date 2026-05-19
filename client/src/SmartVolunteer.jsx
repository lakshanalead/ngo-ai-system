import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "./firebase";

function SmartVolunteer() {

  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {

    fetchRequests();
    fetchVolunteers();

  }, []);

  // FETCH REQUESTS
  const fetchRequests = async () => {

    const snapshot = await getDocs(
      collection(db, "requests")
    );

    const data = snapshot.docs.map((doc) => ({

      id: doc.id,
      ...doc.data()

    }));

    setRequests(data);
  };

  // FETCH VOLUNTEERS
  const fetchVolunteers = async () => {

    const snapshot = await getDocs(
      collection(db, "volunteers")
    );

    const data = snapshot.docs.map((doc) => ({

      id: doc.id,
      ...doc.data()

    }));

    setVolunteers(data);
  };

  // AI MATCHING LOGIC
  const assignVolunteer = (request) => {

    const matchedVolunteer = volunteers.find(

      (volunteer) =>

        volunteer.available === true &&

        (
          volunteer.skill.toLowerCase() ===
          request.issue.toLowerCase()
        )

    );

    return matchedVolunteer;
  };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Smart Volunteer Assignment
      </h1>

      <div className="grid gap-4">

        {requests.map((request) => {

          const volunteer =
            assignVolunteer(request);

          return (

            <div
              key={request.id}
              className="border p-4 rounded shadow"
            >

              <h2 className="text-xl font-bold">
                {request.issue}
              </h2>

              <p>
                Location:
                {" "}
                {request.location}
              </p>

              <p>
                Urgency:
                {" "}
                {request.urgency}
              </p>

              <p>
                Description:
                {" "}
                {request.description}
              </p>

              <br />

              {volunteer ? (

                <div className="text-green-600">

                  <h3 className="font-bold">
                    Volunteer Assigned
                  </h3>

                  <p>
                    {volunteer.name}
                  </p>

                  <p>
                    Skill:
                    {" "}
                    {volunteer.skill}
                  </p>

                </div>

              ) : (

                <p className="text-red-500">
                  No Matching Volunteer
                </p>

              )}

            </div>

          );
        })}

      </div>

    </div>
  );
}

export default SmartVolunteer;