import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "./auth";

export default function MapView() {
    const [position, setPosition] = useState([20.5937, 78.9629]); // India coordinates

    useEffect(() => {
        axios.get("http://localhost:5000/api/map-view", {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
        .catch(() => alert("User not logged in"));
    }, []);

    return (
        <MapContainer center={position} zoom={4} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}>
                <Popup>India</Popup>
            </Marker>
        </MapContainer>
    );
}
