import RegisterForm from "./RegisterForm";
import ClaimsTable from "./ClaimsTable";
import UsersTable from "./UsersTable";
import "./Admin.css";

export default function AdminView({ reclamos, usuarios, onRegistrar, onResolver, onToggleAcceso }) {
  return (
    <section className="admin-view">
      <RegisterForm onRegistrar={onRegistrar} />
      <ClaimsTable reclamos={reclamos} onResolver={onResolver} />
      <UsersTable usuarios={usuarios} onToggleAcceso={onToggleAcceso} />
    </section>
  );
}