import UsersTable from "../components/UsersTable/UsersTable";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const AdminUsersPage = () => (
  <ProtectedRoute rol="admin">
    <UsersTable />
  </ProtectedRoute>
);

export default AdminUsersPage;
