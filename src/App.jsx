import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Alogin } from "./pages/Alogin";
import { Register } from "./pages/Register";
import { Contact } from "./pages/Contact";
import { Navbar } from "./components/Navbar";
import { Payment } from "./components/Payment";
import { Forms } from "./components/Forms";
import { RecordUpdate } from "./pages/RecordUpdate.jsx";
import { Error } from "./pages/Error";
import { Notadmin } from "./pages/Notadmin";
import { Logout } from "./pages/Logout";
import { LoginFirst } from "./pages/LoginFirst";
import { AdminContacts } from "./pages/AdminContacts";
import { AdminPayments } from "./pages/AdminPayment";
import { AdminForm } from "./pages/AdminForm";
import { AdminUsers } from "./pages/AdminUsers";
import { AdminLayout } from "./components/layouts/AdminLayout";
import { AdminUpdate } from "./pages/Admin-Update";
import { FormsUpdate } from "./pages/Forms-Update.jsx";
import { PaymentsUpdate } from "./pages/Payments-Update";
import { Records } from "./pages/Records.jsx";
import { AdminForm1 } from "./pages/AdminForm1";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<Alogin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/records" element={<Records />} />
          <Route path="/adminerror" element={<Notadmin />} />
          <Route path="/loginfirst" element={<LoginFirst />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/form" element={<Forms />} />
          <Route path="/forms" element={<AdminForm1 />} />{" "}
          <Route path="/payment" element={<Payment />} />
          <Route path="/records/:id/edit" element={<RecordUpdate />} />
          <Route path="*" element={<Error />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="forms" element={<AdminForm />} />
            <Route path="users/:id/edit" element={<AdminUpdate />} />
            <Route path="forms/:id/edit" element={<FormsUpdate />} />
            <Route path="payments/:id/edit" element={<PaymentsUpdate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
