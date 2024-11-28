import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CreateUsers from "../pages/Admin/CreateUsers";
import AllUsers from "../pages/Admin/AllUsers";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/createUser" element={<CreateUsers />} />
            <Route path="/allUsers" element={<AllUsers />} />
        </Routes>
    );
};

export default AdminRoutes;