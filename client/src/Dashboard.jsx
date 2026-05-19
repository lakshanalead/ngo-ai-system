import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function Dashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "requests")
        );

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRequests(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-5">
        NGO Dashboard
      </h1>

      {requests.length === 0 ? (
        <p>No Requests Found</p>
      ) : (
        requests.map((req) => (
          <div
            key={req.id}
            className="border p-4 mb-4 rounded shadow"
          >
            <h2 className="text-2xl font-bold">
              {req.issue}
            </h2>

            <p>
              <strong>Urgency:</strong> {req.urgency}
            </p>

            <p>
              <strong>Location:</strong> {req.location}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;