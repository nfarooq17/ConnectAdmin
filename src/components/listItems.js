import React, { useContext } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonAdd from "@material-ui/icons/PersonAdd";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LayersIcon from "@material-ui/icons/Layers";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { NotificationImportant, OfflineBoltOutlined, People, PowerOff, PowerOutlined } from "@material-ui/icons";
import AuthContext from "./config/context";


const siteURL = "https://connection-6692a.web.app/"

export const mainListItems = (
  
  <div>
    <Link to='/' style={{textDecoration:"none",color: "grey"}} >
      <ListItem  >
        <ListItemIcon>
          <DashboardIcon style={{color:"#3F51B5"}} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <a href={siteURL.concat("AddUser")} style={{textDecoration:"none",color: "grey"}}>
      <ListItem button>
        <ListItemIcon>
          <PersonAdd style={{color:"#3F51B5"}} />
        </ListItemIcon>
        <ListItemText primary="Add User" />
      </ListItem>
    </a>
    <a href={siteURL.concat("AddAdmin")} style={{textDecoration:"none",color: "grey"}}>
      <ListItem button>
        <ListItemIcon>
          <PersonAdd style={{color:"#3F51B5"}} />
        </ListItemIcon>
        <ListItemText primary="Add Admin" />
      </ListItem>
    </a>
    <a href={siteURL.concat("User")} style={{textDecoration:"none",color: "grey"}}>
      <ListItem button>
        <ListItemIcon>  
          <People style={{color:"#3F51B5"}} />
        </ListItemIcon>
        <ListItemText primary="User" />
      </ListItem>
    </a>
    <a  href={siteURL.concat("Admin")} style={{textDecoration:"none",color: "grey"}}>
      <ListItem button>
        <ListItemIcon>  
          <People style={{color:"#3F51B5"}} />
        </ListItemIcon>
        <ListItemText primary="Admins" />
      </ListItem>
    </a>
    <a href={siteURL.concat("Instructions")} style={{textDecoration:"none",color: "grey"}}>
    <ListItem button>
      <ListItemIcon >
        <AssignmentTurnedInIcon style={{color:"#3F51B5"}} />
      </ListItemIcon>
      <ListItemText primary="Instructions" />
    </ListItem>
    </a>
    <a href={siteURL.concat("Alert")} style={{textDecoration:"none",color: "grey"}}>
    <ListItem button>
      <ListItemIcon >
        <NotificationImportant style={{color:"#3F51B5"}} />
      </ListItemIcon>
      <ListItemText primary="ALert" />
    </ListItem>
    </a>
    <a href={siteURL.concat("Exams")} style={{textDecoration:"none",color: "grey"}}>
    <ListItem button>
      <ListItemIcon>
        <ImportContactsIcon style={{color:"#3F51B5"}} />
      </ListItemIcon>
      <ListItemText primary="Exams" />
    </ListItem>
    </a>
    <a href={siteURL.concat("Votes")} style={{textDecoration:"none",color: "grey"}}>
    <ListItem button>
      <ListItemIcon>
        <ThumbUpIcon style={{color:"#3F51B5"}}/>
      </ListItemIcon>
      <ListItemText primary="Votes" />
    </ListItem>
    </a>
    <a href={siteURL.concat("News")} style={{textDecoration:"none",color: "grey"}}>
    <ListItem button>
      <ListItemIcon>
        <AnnouncementIcon style={{color:"#3F51B5"}} />
      </ListItemIcon>
      <ListItemText primary="News" />
    </ListItem>
    </a>
    <Link onClick={()=>{window.localStorage.removeItem("user","webpath"); window.location.reload(); return false}}  style={{textDecoration:"none",color: "grey"}}>
    <ListItem button>
      <ListItemIcon>
        <OfflineBoltOutlined style={{color:"#3F51B5"}} />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
    </Link>
  </div>
);

