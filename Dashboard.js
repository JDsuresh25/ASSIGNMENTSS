import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "./auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/dashboard", {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
        .then(res => setCards(res.data.cards))
        .catch(() => alert("User not logged in"));
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {cards.map(card => (
                <div key={card.id} onClick={() => navigate(`/map/${card.id}`)} style={{ border: "1px solid black", padding: 10, margin: 10 }}>
                    {card.title}
                </div>
            ))}
        </div>
    );
}
