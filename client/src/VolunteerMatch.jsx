import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "./firebase";

function VolunteerMatch() {

  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {

    fetchRequests();
    fetchVolunteers();

  }, []);

  // FETCH REQUESTS
  const fetchRequests = async () => {

    const querySnapshot = await getDocs(
      collection(db, "requests")
    );

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setRequests(data);
  };

  // FETCH VOLUNTEERS
  const fetchVolunteers = async () => {

    const querySnapshot = await getDocs(
      collection(db, "volunteers")
    );

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setVolunteers(data);
  };

  // MATCH VOLUNTEER
  const findVolunteer = (request) => {

    return volunteers.find(
      (volunteer) =>
        volunteer.available === true
    );
  };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-5">
        Volunteer Matching
      </h1>

      {requests.map((request) => {

        const matchedVolunteer =
          findVolunteer(request);

        return (

          <div
            key={request.id}
            className="border p-4 mb-4 rounded"
          >

            <h2 className="text-xl font-bold">
              {request.issue}
            </h2>

            <p>
              Urgency: {request.urgency}
            </p>

            <p>
              Location: {request.location}
            </p>

            <br />

            {matchedVolunteer ? (

              <div>

                <p className="text-green-500 font-bold">
                  Volunteer Assigned
                </p>

                <p>
                  {matchedVolunteer.name}
                </p>

              </div>

            ) : (

              <p className="text-red-500">
                No Volunteer Available
              </p>

            )}

          </div>

        );
      })}

    </div>
  );
}

export default VolunteerMatch;