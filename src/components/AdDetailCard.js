import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Delete, Edit } from '@material-ui/icons';
import firebase from 'firebase/app'
import 'firebase/firestore'
import UpdateUser from '../Pages/UpdateUser';
import Modal from '@material-ui/core/Modal';
import { Field, Formik, Form } from "formik";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Container } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor:'white'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function UserDetailCard({id,data}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  async function deleteUser(id){
     firebase.firestore().collection('admins').doc(id).delete().then(alert("dleted")).catch((error)=>alert(error))
    }
    async function Register(value){
      
      const userRef = await firebase.firestore().collection('admins').doc(id).get()
      console.log(userRef.data())
      
      if(!userRef.empty){
        await firebase.firestore().collection('admins').doc(id).update(value)
        alert ('Done!')
        
      }
      
     }
  const body = (
    <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container component="main" maxWidth="xs">
   
      <div className={classes.paper}>
        
        
        <Formik
      initialValues={{
        email:""

        
      }}
      onSubmit={(value)=>{Register(value)}}
    >
      {({ submitForm, isSubmitting }) => (
        <Form className={classes.form} noValidate>
          <Grid container spacing={2}>
              <Grid item xs={12}>

            
                </Grid>
            <Grid item xs={12} style={{marginBottom:10}}>
              <Field
                component={TextField}
                name="email"
                variant="outlined"
                fullWidth
                id="Email"
                label="Email"
                autoFocus
              />
            </Grid>
           
          </Grid>
          <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update 
              </Button>
          
        </Form>
        )}
        </Formik>
      </div>
      
    </Container>
      </main>
  );

  return (
    <Card style={{
        alignSelf:'center',
        alignItems:'center',
        alignContent:'center',
        justifySelf:'center',
        marginLeft:50,
        width:'100%'
    }} className={classes.root}>
      <CardMedia
          className={classes.media}
          image={data.image}
          title="Contemplative Reptile"
        />
      
      <CardContent>
      <Typography variant="body2" color="textPrimary" component="p">
          FirstName: {data.firstName}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          LastName: {data.lastName}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          Email: {data.email}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          Added By: {data.name}
        </Typography><Typography variant="body2" color="textPrimary" component="p">
          Office: {data.office}
        </Typography>
        {/* <Typography variant="body2" color="textSecondary" component="p">
          {data.position}
        </Typography> */}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton 
        aria-label="add to favorites"
        onClick={()=>deleteUser(id)}
        >
          <Delete/>
          
        </IconButton>
        <IconButton aria-label="share"
        onClick={handleOpen}
        >
                                      
          <Edit />
        </IconButton>
       
      </CardActions>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      
    </Card>
  );
}