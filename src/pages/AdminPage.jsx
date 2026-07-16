import AdminView from "../components/AdminView/AdminView";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const AdminPage = () => (
  <ProtectedRoute rol="admin">
    <AdminView />
  </ProtectedRoute>
);

export default AdminPage;
