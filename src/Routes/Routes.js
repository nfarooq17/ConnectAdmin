import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Instructions from "../Pages/Instructions";
import AddAdmin from "../Pages/AddAdmin";
import AddUser from "../Pages/AddUser";
import NewExams from '../Pages/NewExams'
import NewVotes from "../Pages/NewVotes";
import NewNews from "../Pages/NewNews";
import Votes from "../Pages/Votes";
import User from "../Pages/User";
import UserDetails from "../Pages/UserDetails";
import UserTable from "../components/UserTable";
import Admin from "../Pages/Adimin";
import Exams from "../Pages/Exams";
import UpdateUser from "../Pages/UpdateUser";
import AdminDetails from "../Pages/AdminDetails";
import NewInstructions from "../Pages/NewInstructions";
import News from "../Pages/News";
import NewsDetails from "../Pages/NewsDetails";
import ExDetails from "../Pages/ExDetails";
import VoteDetails from "../Pages/VoteDetails";
import InstructionDetails from "../Pages/InstructionDetails";
import AuthContext from "../components/config/context";
import AlertDetails from "../Pages/AlertDetails";
import NewAlert from "../Pages/NewAlert";
import Alert from "../Pages/Alert";













function Routes(props) {
  const authContext = useContext(AuthContext)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        {/* {authContext.user && <Route path="/Login" component={Login}></Route>} */}
        <Route path="/Votes" component={Votes}></Route>
        <Route path="/User" component={User}></Route>
        <Route path="/Exams" component={Exams}></Route>
        <Route path="/AddUser" component={AddUser}></Route>
        <Route path="/AddAdmin" component={AddAdmin}></Route>
        <Route path="/Admin" component={Admin}></Route>
        <Route path="/Instructions" component={Instructions}></Route>
        <Route path="/Alert" component={Alert}></Route>

        <Route path="/NewInstruction" component={NewInstructions}></Route>
        <Route path="/NewAlert" component={NewAlert}></Route>
        <Route path = '/NewExams' component={NewExams}></Route>
        <Route path = '/NewVotes' component={NewVotes}></Route>
        <Route path = '/NewNews' component={NewNews}></Route>
        <Route path = '/UserTable/:id' component={UserDetails}></Route>
        <Route path = '/UserDetails' component={UserDetails}></Route>
        <Route path = '/UserTable' component={UserTable}></Route>
        <Route path = '/AdminTable/:id' component={AdminDetails}></Route>
        <Route path = '/AdminDetails' component={AdminDetails}></Route>
        <Route path = '/News' component={News}></Route>
        <Route path = '/NewsDetailTable/:id' component={NewsDetails}></Route>
        <Route path = '/ExDetailsTable/:id' component={ExDetails}></Route>
        <Route path = '/VoteDetailsTable/:id' component={VoteDetails}></Route>
        <Route path = '/InstructionDetailTable/:id' component={InstructionDetails}></Route>
        <Route path = '/AlertDetailTable/:id' component={AlertDetails}></Route>












      </Switch>
    </Router>
  );
}

export default Routes;
