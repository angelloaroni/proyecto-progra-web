import RegisterForm from "../components/RegisterForm/RegisterForm";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const AdminRegisterPage = () => (
  <ProtectedRoute rol="admin">
    <RegisterForm />
  </ProtectedRoute>
);

export default AdminRegisterPage;
