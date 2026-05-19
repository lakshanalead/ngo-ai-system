import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot
} from "firebase/firestore";

import { db } from "./firebase";

import { motion } from "framer-motion";

function LiveDashboard() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(

      collection(db, "requests"),

      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({

          id: doc.id,
          ...doc.data()

        }));

        setRequests(data);

      }

    );

    return () => unsubscribe();

  }, []);

  return (

    <div className="min-h-screen bg-slate-950 text-white p-6">

      <h1 className="text-4xl font-bold mb-6 text-cyan-400">
        Live Emergency Dashboard
      </h1>

      <div className="grid gap-4">

        {requests.map((request) => (

          <motion.div

            key={request.id}

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.5 }}

            className="bg-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700"
          >

            <h2 className="text-2xl font-bold mb-2 text-cyan-300">
              {request.issue}
            </h2>

            <p className="mb-1">
              <strong>Location:</strong>
              {" "}
              {request.location}
            </p>

            <p className="mb-1">
              <strong>Urgency:</strong>
              {" "}
              {request.urgency}
            </p>

            <p className="mb-1">
              <strong>Sentiment Score:</strong>
              {" "}
              {request.sentimentScore}
            </p>

            <p className="mb-1">
              <strong>Description:</strong>
              {" "}
              {request.description}
            </p>

          </motion.div>

        ))}

      </div>

    </div>

  );
}

export default LiveDashboard;