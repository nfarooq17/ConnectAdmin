import React, { useState,useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
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
import { Field, Formik, Form } from "formik";
import firebase from 'firebase/app'
import 'firebase/firestore'
import AuthContext from '../components/config/context'
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import "firebase/storage"
import { TextField } from "formik-material-ui";




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
  button: {
    color: "blue[900]",
    margin: 10,
    alignSelf:'center'
  },
  input: {
    display: "none"
  },
}));

export default function AddAdmin() {
  const classes = useStyles();
  const authContext = useContext(AuthContext)

  const [open, setOpen] = React.useState(true);
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleUpload(values) {
    if(file == null){
      alert('Please Select an Image')
      return
    }
    
    const uploadTask = await firebase.storage().ref(`/images/${file.name}`).put(file);
    // uploadTask.on("state_changed", console.log, console.error, () => {
    //   const furl =  firebase.storage()
    //     .ref("images")
    //     .child(file.name)
    //     .getDownloadURL()
    //     .then((url1) => {
          
    //       setURL(url1);
    //       console.log(url1)
    //       value.image = url1
    //     });
    // });

    

    const urr = await firebase.storage().ref("images")
    .child(file.name)
    .getDownloadURL()
    values.image = urr
    
    Register(values)
    
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  async function Register(value){
    const userRef = await firebase.firestore().collection('admins').where('email','==',value.email).get()
    value.admin = authContext.user.firstName
    alert(userRef.empty)
    if(userRef.empty){
      await firebase.firestore().collection('admins').add(value)
      alert ('Done!')
      setFile(null);
    }
    else{
     alert ('Already Registered!')
     setFile(null);
    }
   }

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
            Add Admin
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
       <Formik
       initialValues={{
        firstName: "",
        lastName: "",
        office:"",
        email:"",
        password:"",

      }}
      onSubmit={(values) => {handleUpload(values)}}>

       {({ submitForm, isSubmitting }) => ( 
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleChange}
            />
            <label style={{alignSelf: 'center',}} htmlFor="contained-button-file">
              <Fab component="span" className={classes.button}>
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
      
        <Form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                autoComplete="firstName"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                disabled={false}

                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                variant="outlined"
                disabled={false}

                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                variant="outlined"
                fullWidth
                label="Office"
                disabled={false}

                name="office"
                
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                variant="outlined"
                component={TextField}
                fullWidth
                id="email"
                disabled={false}

                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                variant="outlined"
                fullWidth
                disabled={false}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
           
          </Grid>
          <Button
          style={{marginTop:10}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            ADD
          </Button>
          
        </Form>
      </div>
      
    </Container>)}
    </Formik>
      </main>
    </div>
  );
}
