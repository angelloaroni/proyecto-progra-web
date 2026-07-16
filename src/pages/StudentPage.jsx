import ItemTable from "../components/ItemTable/ItemTable";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const StudentPage = () => (
  <ProtectedRoute rol="student">
    <ItemTable rol="student" />
  </ProtectedRoute>
);

export default StudentPage;
