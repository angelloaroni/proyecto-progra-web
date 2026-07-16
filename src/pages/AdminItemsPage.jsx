import ItemTable from "../components/ItemTable/ItemTable";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const AdminItemsPage = () => (
  <ProtectedRoute rol="admin">
    <ItemTable rol="admin" />
  </ProtectedRoute>
);

export default AdminItemsPage;
