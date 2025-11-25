import { Routes, Route } from "react-router-dom";
import Homepage from "../Home";
import ClaimCreate from "../components/Claim/claimcreate";
import AllClaims from "../components/Claim/allclaim";
import One from "../components/Claim/oneclaim";
import CreateClient from "../components/Client/clientcreate";
import Workers from '../components/Worker/allcworker'
import Client from "../components/Client/allclient"
import Worker from "../components/Worker/workercreate";
import WorkerEdit from "../components/Worker/workeredit";
import ClientEdit from "../components/Client/clientedit"
import Login from "../../src/components/Client/login"
import Oneuser from "../../src/components/Client/oneclient"
import MyClaims from "../components/Claim/myclaim";
import AllPayment from "../components/Claim/alliploads"
const RoutingConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/claim/create" element={<ClaimCreate />} />
            <Route path="/claims/list" element={<AllClaims />} />
            <Route path="/claim/:id" element={<One />} />
            <Route path="/register" element={<CreateClient />} />
            <Route path="/client/" element={<Client />} />
            <Route path="/employe/" element={<Workers />} />
            <Route path="/employe/create" element={<Worker />} />
            <Route path="/employe/edit/:id" element={<WorkerEdit />} />
            <Route path="/client/edit/:id" element={<ClientEdit />} />
            <Route path="login" element={<Login/>}/>
            <Route path="/user/:id" element={<Oneuser />} />
            <Route path="/my/claim/:id" element={<MyClaims/>}/>
             <Route path="/all/payment" element={<AllPayment/>}/>

        </Routes>)
}
export default RoutingConfig