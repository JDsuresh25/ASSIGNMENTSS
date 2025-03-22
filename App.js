import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import MapView from "./MapView";
import { isAuthenticated } from "./auth";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/map/:id" element={isAuthenticated() ? <MapView /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}
