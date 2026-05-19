import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./firebase";

import locationCoordinates from "./locationCoordinates";

function NearestVolunteer() {

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {

    const unsubscribeRequests = onSnapshot(
      collection(db, "requests"),
      async (requestSnapshot) => {

        const requests = requestSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const volunteerSnapshot = await new Promise((resolve) => {

          onSnapshot(
            collection(db, "volunteers"),
            (snapshot) => resolve(snapshot)
          );

        });

        const volunteers = volunteerSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const results = [];

        requests.forEach((req) => {

          const requestCoords =
            locationCoordinates[req.location];

          if (!requestCoords) return;

          let bestVolunteer = null;

          volunteers.forEach((vol) => {

            if (!vol.available) return;

            const volunteerCoords =
              locationCoordinates[vol.location];

            if (!volunteerCoords) return;

            // Distance calculation
            const distance = Math.sqrt(
              Math.pow(
                requestCoords[0] - volunteerCoords[0],
                2
              ) +
              Math.pow(
                requestCoords[1] - volunteerCoords[1],
                2
              )
            );

            // Find nearest volunteer
            if (
              !bestVolunteer ||
              distance < bestVolunteer.distance
            ) {

              bestVolunteer = {
                ...vol,
                distance,
              };
            }

          });

          results.push({
            request: req.issue,
            location: req.location,
            urgency: req.urgency,
            assignedVolunteer: bestVolunteer,
          });

        });

        setAssignments(results);

      }
    );

    return () => unsubscribeRequests();

  }, []);

  return (

    <div className="p-5">

      <h1 className="text-4xl font-bold mb-6">
        AI Volunteer Allocation
      </h1>

      {assignments.map((item, index) => (

        <div
          key={index}
          className="border rounded p-4 mb-4 shadow"
        >

          <h2 className="text-2xl font-bold">
            {item.request}
          </h2>

          <p>
            Location: {item.location}
          </p>

          <p>
            Urgency:
            <span
              className={
                item.urgency === "High"
                  ? "text-red-500 font-bold ml-2"
                  : item.urgency === "Medium"
                  ? "text-yellow-500 font-bold ml-2"
                  : "text-green-500 font-bold ml-2"
              }
            >
              {item.urgency}
            </span>
          </p>

          {item.assignedVolunteer ? (

            <div className="mt-3">

              <p className="text-green-600 font-bold">
                Assigned Volunteer
              </p>

              <p>
                Name: {item.assignedVolunteer.name}
              </p>

              <p>
                Skill: {item.assignedVolunteer.skill}
              </p>

              <p>
                Location: {item.assignedVolunteer.location}
              </p>

            </div>

          ) : (

            <p className="text-red-500 mt-3">
              No Volunteer Available
            </p>

          )}

        </div>

      ))}

    </div>
  );
}

export default NearestVolunteer;