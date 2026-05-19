import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import {
  collection,
  onSnapshot
} from "firebase/firestore";

import { db } from "./firebase";

function Maps() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(

      collection(db, "requests"),

      (snapshot) => {

        const data = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data()
          })
        );

        setRequests(data);

      }

    );

    return () => unsubscribe();

  }, []);

  return (

    <MapContainer
      center={[13.0827, 80.2707]}
      zoom={12}
      style={{
        height: "90vh",
        width: "100%"
      }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {requests.map((request) => (

        request.location?.lat && (

          <Marker

            key={request.id}

            position={[
              request.location.lat,
              request.location.lng
            ]}
          >

            <Popup>

              <strong>
                {request.issue}
              </strong>

              <br />

              {request.urgency}

            </Popup>

          </Marker>

        )

      ))}

    </MapContainer>
  );
}

export default Maps;