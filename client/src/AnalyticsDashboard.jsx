import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./firebase";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AnalyticsDashboard() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "requests"),
      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRequests(data);
      }
    );

    return () => unsubscribe();

  }, []);

  // Urgency Count
  const high = requests.filter(
    (r) => r.urgency === "High"
  ).length;

  const medium = requests.filter(
    (r) => r.urgency === "Medium"
  ).length;

  const low = requests.filter(
    (r) => r.urgency === "Low"
  ).length;

  // Pie Chart Data
  const urgencyData = [
    { name: "High", value: high },
    { name: "Medium", value: medium },
    { name: "Low", value: low },
  ];

  // City Count
  const cityMap = {};

  requests.forEach((req) => {

    if (cityMap[req.location]) {
      cityMap[req.location]++;
    } else {
      cityMap[req.location] = 1;
    }

  });

  const cityData = Object.keys(cityMap).map((city) => ({
    city,
    count: cityMap[city],
  }));

  const COLORS = [
    "#ff0000",
    "#ffaa00",
    "#00cc66",
  ];

  return (

    <div className="p-5">

      <h1 className="text-4xl font-bold mb-8">
        NGO Analytics Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

        <div className="bg-red-500 text-white p-5 rounded shadow">
          <h2 className="text-2xl font-bold">
            High Priority
          </h2>

          <p className="text-4xl mt-3">
            {high}
          </p>
        </div>

        <div className="bg-yellow-500 text-white p-5 rounded shadow">
          <h2 className="text-2xl font-bold">
            Medium Priority
          </h2>

          <p className="text-4xl mt-3">
            {medium}
          </p>
        </div>

        <div className="bg-green-500 text-white p-5 rounded shadow">
          <h2 className="text-2xl font-bold">
            Low Priority
          </h2>

          <p className="text-4xl mt-3">
            {low}
          </p>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Pie Chart */}
        <div className="bg-white p-5 rounded shadow">

          <h2 className="text-2xl font-bold mb-5">
            Emergency Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={urgencyData}
                dataKey="value"
                outerRadius={100}
                label
              >

                {urgencyData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Bar Chart */}
        <div className="bg-white p-5 rounded shadow">

          <h2 className="text-2xl font-bold mb-5">
            City-wise Emergencies
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={cityData}>

              <XAxis dataKey="city" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="count" fill="#3366ff" />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default AnalyticsDashboard;