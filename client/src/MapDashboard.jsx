
import { useEffect, useState } from "react";
import { db } from "./firebase";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";


import locationCoordinates from "./locationCoordinates";

// Fix marker issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapDashboard() {

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

  return (

    <div className="p-5">

      <h1 className="text-4xl font-bold mb-5">
        Emergency Map Dashboard
      </h1>

      <MapContainer
        center={[13.0827, 80.2707]}
        zoom={5}
        style={{
          height: "600px",
          width: "100%",
        }}
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {requests.map((req) => (

          <Marker
            key={req.id}

            position={
              locationCoordinates[req.location] || [13.0827, 80.2707]
            }
          >

            <Popup>

              <div>

                <h2 className="font-bold text-lg">
                  {req.issue}
                </h2>

                <p>
                  Location: {req.location}
                </p>

                <p>
                  Urgency: {req.urgency}
                </p>

              </div>

            </Popup>

          </Marker>

        ))}

      </MapContainer>

    </div>
  );
}

export default MapDashboard;