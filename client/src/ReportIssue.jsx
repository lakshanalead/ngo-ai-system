import { useState, useEffect } from "react";

import {
  collection,
  addDoc
} from "firebase/firestore";

import { db } from "./firebase";

import Sentiment from "sentiment";

function ReportIssue() {

  const sentiment = new Sentiment();

  const [issue, setIssue] = useState("");

  const [urgency, setUrgency] = useState("");

  const [location, setLocation] = useState({
    lat: "",
    lng: ""
  });

  const [description, setDescription] = useState("");

  // GET REAL USER LOCATION
  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setLocation({

          lat: position.coords.latitude,
          lng: position.coords.longitude

        });

      },

      (error) => {

        console.log(error);

      }

    );

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    // SENTIMENT ANALYSIS
    const result = sentiment.analyze(description);

    console.log(result);

    // AI URGENCY DETECTION
    let detectedUrgency = urgency;

    if (

      result.score < -3 ||

      description.toLowerCase().includes("emergency") ||

      description.toLowerCase().includes("urgent") ||

      description.toLowerCase().includes("help") ||

      description.toLowerCase().includes("flood") ||

      description.toLowerCase().includes("starving") ||

      description.toLowerCase().includes("no food")

    ) {

      detectedUrgency = "High";

    }

    try {

      await addDoc(collection(db, "requests"), {

        issue,
        urgency: detectedUrgency,
        location,
        description,
        sentimentScore: result.score,
        createdAt: new Date()

      });

      alert("Request Submitted Successfully");

      setIssue("");
      setUrgency("");
      setDescription("");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-slate-950 text-white p-6">

      <div className="max-w-lg mx-auto bg-slate-900 p-6 rounded-2xl shadow-lg">

        <h1 className="text-4xl font-bold mb-6 text-cyan-400">

          Report Community Issue

        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          <input
            type="text"
            placeholder="Issue Type"
            className="p-3 rounded bg-slate-800 border border-slate-700"
            value={issue}
            onChange={(e) =>
              setIssue(e.target.value)
            }
            required
          />

          <select
            className="p-3 rounded bg-slate-800 border border-slate-700"
            value={urgency}
            onChange={(e) =>
              setUrgency(e.target.value)
            }
            required
          >

            <option value="">
              Select Urgency
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>

          <textarea
            placeholder="Describe the issue..."
            className="p-3 rounded bg-slate-800 border border-slate-700"
            rows="5"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 p-3 rounded font-bold"
          >

            Submit Request

          </button>

        </form>

        <div className="mt-6 bg-slate-800 p-4 rounded">

          <h2 className="text-xl font-bold mb-2">
            Current GPS Location
          </h2>

          <p>
            Latitude:
            {" "}
            {location.lat}
          </p>

          <p>
            Longitude:
            {" "}
            {location.lng}
          </p>

        </div>

      </div>

    </div>

  );
}

export default ReportIssue;