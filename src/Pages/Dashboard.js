import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Avatar from '@material-ui/core/Avatar';
import { mainListItems} from "../components/listItems";
import Chart from "../components/Chart";
import Deposits from "../components/Deposits";
import ExamTable from "../components/ExamTable";
import LinearProgress from '@material-ui/core/LinearProgress';
import firebase from 'firebase/app'
import 'firebase/firestore'
import VoteTable from "../components/VoteTable";
import InstructionTable from "../components/InstructionTable";
import AuthContext from "../components/config/context";





const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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

export default function Dashboard() {
  const classes = useStyles();
  const authContext = useContext(AuthContext)
  const [open, setOpen] = React.useState(true);
  const [avg , setAvg] = useState()
  const [exlist , setExlist]= useState()
  const [votelist , setVote]= useState()
  const [inst , setInst] = useState()


  async function countEx() {
    let i = 0 
    let y = 0
    const exRef = await firebase.firestore().collection('exams').get()
    setExlist(exRef.docs.map((doc)=>({id: doc.id , data: doc.data()})))
    
   
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
  async function countVote(){
    console.log("yr b ")
    const voteRef = await firebase.firestore().collection('votes').get()
    setVote(voteRef.docs.map((doc)=>({id: doc.id , data: doc.data()})))
  }
  async function countInst(){
    console.log("yr b ")
    const voteRef = await firebase.firestore().collection('inst').get()
    setInst(voteRef.docs.map((doc)=>({id: doc.id , data: doc.data()})))
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    countEx();
    countVote();
    countInst();
  }, [])

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
            Dashboard
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
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={1} md={8} lg={9}>
              <Paper >
                
             <BorderLinearProgress variant="determinate" value={avg} />
              </Paper>
            </Grid>
            
           
            {exlist && <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ExamTable data={exlist}  />
              </Paper>
            </Grid>}
            {votelist && <Grid item xs={12}>
              <Paper className={classes.paper}>
                <VoteTable data={votelist}  />
              </Paper>
            </Grid>}
            {inst && <Grid item xs={12}>
              <Paper className={classes.paper}>
                <InstructionTable data={inst}  />
              </Paper>
            </Grid>}
          </Grid>
          
         
        </Container>
      </main>
    </div>
  );
}
