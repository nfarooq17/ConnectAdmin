 import React, { useContext, useState } from "react";
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
import firebase from 'firebase/app'
import 'firebase/firestore'
import AuthContext from "../components/config/context";

const theme = useTheme();


function getStyles(name, location, theme) {
  return {
    fontWeight:
      location.indexOf(name) === -1
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
const names = [
  "Rig-1",
  "Rig-50",
 "QHSE department ",
"Operation department ",
"HR department ",
"Technical department",
 "Supply chain",
 "Finance",
 "IT",
 "Head office",
 "Yard",
 "Offshore",
 "Land"
];
const positions=[
  "QHSE manager" ,
"HR Manager", 
"Rig manager", 
"RS ",
"ARS",
"HR coordinator" ,
"RSTC",
"Driller",
"Driver"
]
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

export default function NewExams() {
  const classes = useStyles();
  const [location, setlocation] = React.useState([]);
  const [position, setPostition] = React.useState([]);
  const [count , setCount] = useState(0)
  const authContext = useContext(AuthContext)
  async function addEx(value){
    value.time= firebase.firestore.FieldValue.serverTimestamp()
    value.name = authContext.user.firstName
    value.office=authContext.user.office
    value.location=location
    value.position=position
    let arr=[]
      if(value.option1?  true: false){
        console.log("op1")
        arr.push({label: value.option1})
      }
      if(value.option2?true: false){
        console.log("op2")

        arr.push({label: value.option2})
      }
      if(value.option3?true: false){
        console.log("op3")

        arr.push({label: value.option3})
      }
      if(value.option4?true: false){
        console.log("op4")

        arr.push({label: value.option4})
      }

      value.options=arr
    await firebase.firestore().collection('exams').add(value)
     alert ('Done!')
   
  }
  const handleChange = (event) => {
    setlocation(event.target.value);
  };
  const handleChange1 = (event) => {
    setPostition(event.target.value);
  };
  function addCount(){
             setCount(count+1)
  }
  function deleteCount(){
    setCount(count-1)
}
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        
        <Formik
      initialValues={{
        question: "",
        
      }}
      onSubmit={(values)=>{addEx(values)}}
    >
      {({ submitForm, isSubmitting }) => (
        <Form className={classes.form} noValidate>
          <Grid container spacing={2}>
              <Grid item xs={12}>

            <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-name-label">Location</InputLabel>
            <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          placeholder="Select Location"
          value={location}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
              <div className={classes.chips}>
              {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                  ))}
            </div>
          )}
          MenuProps={MenuProps}
          >
          {names.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, location, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-name-label">Position</InputLabel>
            <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          placeholder="Select Location"
          value={position}
          onChange={handleChange1}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
              <div className={classes.chips}>
              {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                  ))}
            </div>
          )}
          MenuProps={MenuProps}
          >
          {positions.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, location, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
                </Grid>
            <Grid item xs={12} style={{marginBottom:10}}>
              <Field
                component={TextField}
                name="question"
                variant="outlined"
                fullWidth
                id="Question"
                label="Question"
                autoFocus
              />
            </Grid>
            {count>=1 && <Grid item xs={12} >
              <Field
                component={TextField}
                name="option1"
                variant="outlined"
                
                id="Option1"
                label="Option1"
                autoFocus
              />
            </Grid>}
            {count>=2 && <Grid item xs={12} >
              <Field
                component={TextField}
                name="option2"
                variant="outlined"
                
                id="Option2"
                label="Option2"
                autoFocus
              />
            </Grid>}
            {count>=3 && <Grid item xs={12} >
              <Field
                component={TextField}
                name="option3"
                variant="outlined"
                
                id="Option3"
                label="Option3"
                autoFocus
              />
            </Grid>}
            {count>=4 && <Grid item xs={12} >
              <Field
                component={TextField}
                name='option4'
                variant="outlined"
               
                id="Option4"
                label="Option4"
                autoFocus
              />
            </Grid>}
            <div style={{marginBottom:18, marginLeft:10}}>
            {count <=3 && <Button style={{backgroundColor:'#3F51B5', color:'white'}} onClick={()=>addCount()}>Add Field</Button>}
            {count>=1 &&<Button style={{backgroundColor:'#FF0000', color:'white', marginLeft:10 }} onClick={()=>deleteCount()}>Delete Field</Button>}
            </div>



            
         
           
          </Grid>
          <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Send Exam
              </Button>
          
        </Form>
        )}
        </Formik>
      </div>
      
    </Container>
      </main>
    </div>
  );
}
