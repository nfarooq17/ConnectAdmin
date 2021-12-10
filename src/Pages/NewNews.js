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
import Orders from "../components/ExamTable";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { Field, Formik, Form } from "formik";
import { TextField } from "formik-material-ui";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import AuthContext from "../components/config/context";
import "firebase/storage"
import firebase from 'firebase/app'
import 'firebase/firestore'


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
  button: {
    color: "blue[900]",
    margin: 10,
    alignSelf:'center'
  },
  input: {
    display: "none"
  },
}));
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
const positions = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

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

export default function Instructions() {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState([]);
  const [position, setPostition] = React.useState([]);
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  const theme = useTheme();
  const authContext = useContext(AuthContext)

  function handleChange5(e) {
    setFile(e.target.files[0]);
  }
  async function handleUpload(values) {
    if(file != null){
      const uploadTask = await firebase.storage().ref(`/images/${file.name}`).put(file);
      const urr = await firebase.storage().ref("images")
      .child(file.name)
      .getDownloadURL()
      values.image = urr
      
      Register(values)
    }else{
      Register(values)
    }
    
    
  }
  async function Register(value){

      let n= authContext.user.firstName
      value.name = n.concat(" ",authContext.user.lastName)
      value.office= authContext.user.office
      value.avatar = authContext.user.image
    value.time= firebase.firestore.FieldValue.serverTimestamp()

      await firebase.firestore().collection('posts').add(value)
      alert ('Done!')
      setFile(null);
   
   }
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  const handleChange1 = (event) => {
    setPostition(event.target.value);
  };
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
            News
          </Typography>
          <IconButton color="inherit">
          <Avatar/>
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
        description: "",
      }}
      onSubmit={(values)=>{handleUpload(values)}}
    >
      {({ submitForm, isSubmitting }) => (
        <Form style={{marginTop:100}} className={classes.form} noValidate>
          <Grid container spacing={2}>
          <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleChange5}
            />
            <label style={{alignSelf: 'center',}} htmlFor="contained-button-file">
              <Fab component="span" className={classes.button}>
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="description"
                variant="outlined"
                fullWidth
                id="description"
                label="Description"
                autoFocus
              />
            </Grid>
            
           
         
           
          </Grid>
          <Button
          style={{marginTop:15}}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Send News
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
