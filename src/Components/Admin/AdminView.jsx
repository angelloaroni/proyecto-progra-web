import RegisterForm from "./RegisterForm";
import ClaimsTable from "./ClaimsTable";
import UsersTable from "./UsersTable";
import "./Admin.css";


const AdminView = ({ reclamos, usuarios, onRegistrar, onResolver, onToggleAcceso }) =>{

  return (
    <section className="admin-view">
      <RegisterForm onRegistrar={onRegistrar} />
      <ClaimsTable reclamos={reclamos} onResolver={onResolver} />
      <UsersTable usuarios={usuarios} onToggleAcceso={onToggleAcceso} />
    </section>
  );

}

export default AdminView;