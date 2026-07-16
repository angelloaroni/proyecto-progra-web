import ClaimsTable from "../components/ClaimsTable/ClaimsTable";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const AdminClaimsPage = () => (
  <ProtectedRoute rol="admin">
    <ClaimsTable />
  </ProtectedRoute>
);

export default AdminClaimsPage;
