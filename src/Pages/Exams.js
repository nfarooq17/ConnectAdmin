import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems} from "../components/listItems";
import Chart from "../components/Chart";
import Deposits from "../components/Deposits";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { Field, Formik, Form } from "formik";
import { TextField } from "formik-material-ui";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../components/Title";
import firebase from 'firebase/app'
import 'firebase/firestore'
import VoteTable from "../components/VoteTable";
import VoteDetailsTable from "../components/VoteDetailsTable";
import UserTable from "../components/UserTable";
import ExDetailsTable from "../components/ExDetailsTable";
import AdminTable from "../components/AdminTable";
import { LinearProgress, withStyles } from "@material-ui/core";
import AuthContext from "../components/config/context";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Admin() {
  const classes = useStyles();
  const [votelist , setVote] = useState()
  const [avg, setAvg]= useState()
  const theme = useTheme();
  const authContext = useContext(AuthContext)
  
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  async function countEx() {
    let i = 0 
    let y = 0
    const exRef = await firebase.firestore().collection('exams').get()
    
    
   
    exRef.docs.forEach((e)=>{
      console.log(e.data())
      if(e.data().answers ? true : false)
        {
               i++
        }
             y++
            })
    setAvg((i/y)*100)
    console.log(avg,"ye wala")
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
      async function countVote(){
        console.log("yr b ")
        const voteRef = await firebase.firestore().collection('exams').get()
        setVote(voteRef.docs.map((doc)=>({id: doc.id , data: doc.data()})))
      }

      useEffect(() => {
         countVote();
         countEx();
      }, [])
      const BorderLinearProgress = withStyles((theme) => ({
        root: {
          height: 30,
          borderRadius: 5,
        },
        colorPrimary: {
          backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        bar: {
          borderRadius: 5,
          backgroundColor: '#1a90ff',
        },
      }))(LinearProgress);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Exams
          </Typography>
          <IconButton color="inherit">
            
            <Avatar src={authContext.user.image} />
            
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={6}>
            <Grid item xs={1} md={8} lg={9}>
              <Paper >
              <BorderLinearProgress 
               variant="determinate" value={avg} />
              </Paper>
            </Grid>
            <Grid item xs={1} md={1} lg={3} >

<Link style={{cursor:'pointer' ,textDecoration:"none", marginLeft:40, padding:10, borderRadius:5, backgroundColor:"#3F51B5", color:'white',  }} 
href = '/NewExams'>New Exam</Link>
</Grid>

      
      
      {votelist && <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ExDetailsTable data={votelist}  />
              </Paper>
            </Grid>}
    
      
            </Grid>
    </Container>
      </main>
    </div>
  );
}



// import React, { useState, useEffect } from "react";
// import Link from "@material-ui/core/Link";
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Title from "../components/Title";
// import firebase from 'firebase/app'
// import 'firebase/firestore'

// // Generate Order Data




// function preventDefault(event) {
//   event.preventDefault();
// }

// const useStyles = makeStyles((theme) => ({
//   seeMore: {
//     marginTop: theme.spacing(3),
//   },
// }));

// export default function VoteTable() {

//   const classes = useStyles();
//   const [votelist , setVote] = useState()

//   function getTie(a) {
//     let date = new Date(a.seconds * 1000)
//     return date.toDateString()
//   }
//   async function countVote(){
//     console.log("yr b ")
//     const voteRef = await firebase.firestore().collection('votes').get()
//     setVote(voteRef.docs.map((doc)=>({id: doc.id , data: doc.data()})))
//   }
//   useEffect(() => {
//      countVote();
//   }, [])
//   return (
//     <React.Fragment>
//       <Title>Exams</Title>
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Date</TableCell>
//             <TableCell>Title</TableCell>
//             <TableCell>Created By</TableCell>
//           </TableRow>
//         </TableHead>
//         {votelist&& <TableBody>
//           {votelist.map((row) => (
//             <TableRow key={row.id}>
//               <TableCell>{getTie(row.data.time)}</TableCell>
//               <TableCell>{row.data.Question}</TableCell>
//               <TableCell>{row.data.name}</TableCell>
              
//             </TableRow>
//           ))}
//         </TableBody>}
//       </Table>
//       <div className={classes.seeMore}>
//         <Link color="primary" href="#" >
//           See Details 
//         </Link>
//       </div>
  
//     </React.Fragment>
//   );
// }
