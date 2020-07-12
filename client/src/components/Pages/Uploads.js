import React, { Component, useContext,useEffect,Fragment } from 'react';
import axios from 'axios';
import AuthContext from '../../context/auth/authContext'
import AssignContext from '../../context/assignments/AssignContext'
import SideBar from '../Sidebar/Sidebar'
import Spinner from '../layout/Spinner'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';



// function Uploads() {

//         return (
//             <>
//             <SideBar/>
//             <div className="container" className="card" id="upload" >
//                 {isloading?<Spinner/>:<></>}
//                  {(contactno===9876543210)?<h2 style={{paddingTop:"4%"}}>Upload Solutions !</h2>:<h2 style={{paddingTop:"4%"}}>Upload Assignment !</h2>}
//                 <div className="row" style={{padding:"4%"}}>
//                     <div className="col-lg-12">
//                     {(contactno===9876543210)?(<form action = "/api/solutions" method="POST" encType="multipart/form-data">
//                             <div className="form-group">
//                             <label for="name">Name</label>
//                                 <input type='text' name='name' placeholder="enter clients name..."/>
//                             <label for="contactno">Contact Number</label>
//                                 <input type='text' name='contactno' placeholder="enter clients contactno..."/>
//                             <label for="email">Email</label>
//                                 <input type="text" name="email" placeholder="enter clients email..."/>
//                             <label for="subject">Subject</label>
//                                 <input type='text' name='subject' placeholder="Please Enter name of related subject..."/>
//                             <label for="deadline">Deadline</label>
//                                 <input type='date' name='deadline' placeholder="Please Enter the deadline of assignment..."/>
//                             <label for="range">Range</label>
//                                 <input type='Number' name='range' placeholder="Please Enter expected price..."/>
//                             <label for="range">Assignment File Name</label>
//                                 <input type='text' name='assign' placeholder="Please Enter Assignment file name..."/>
//                             <label for="File">Assignment</label>
//                                 <input type="file" name="file"  id="inputGroupFile04"/>
//                             </div>
//                             <div className="form-group">
//                                 <button className="btn btn-block" type="submit">Upload</button>
//                             </div>
//                         </form>
//                             ):
//                             (<form >
//                             <div className="form-group">
//                             <label for="name">Name</label>
//                                 <input type='text' name='name' value={name} readOnly/>
//                             <label for="contactno">Contact Number</label>
//                                 <input type='text' name='contactno' value={contactno} readOnly/>
//                             <label for="email">Email</label>
//                                 <input type="text" name="email" value={email} readOnly/>
//                             <label for="subject">Subject</label>
//                                 <input type='text' name='subject' placeholder="Please Enter name of related subject..."/>
//                             <label for="deadline">Deadline</label>
//                                 <input type='date' name='deadline' placeholder="Please Enter the deadline of assignment..."/>
//                             <label for="range">Range</label>
//                                 <input type='Number' name='range' placeholder="Please Enter expected price..."/>
//                             <label for="File">Assignment</label>
//                                 <input type="file" name="file"  id="inputGroupFile04"/>
//                             </div>
//                             <div className="form-group">
//                                 <button className="btn btn-block" type="submit">Upload</button>
//                             </div>
//                         </form>)}
                        
                        
//                     </div>
//                 </div>
//             </div>
//             </>
//         )
// }

// export default Uploads;


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AlertUI from '../layout/Alert'



export default function Login(props) {
    const authContext = useContext(AuthContext)
    const {isAuthenticated,user,loadUser,isloading,setLoading,token} = authContext
    const assignContext = useContext(AssignContext)
    const {files,downloadfiles} = assignContext
    useEffect(()=>{
        loadUser()
        
    },[])
    let name = '';
    let contactno = ''
    let email = ''
    let locs =[]
    if(user){
        name=user.name
        contactno = user.phone
        email = user.email
        downloadfiles(contactno)
    }
    if(files){
        files.map((file)=>{
            let temp = "/api/Specific/" + file.file
            locs.push(temp)
        })
    }

    const classes = useStyles();
   
    return (
        <>
        <SideBar/>
        <Container  className="card" style={{paddingBottom:"2%",marginTop:"0%"}} component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonIcon style={{height:"50px",width:"50px"}}/>
                </Avatar>
                <Typography component="h1" variant="h5" style={{fontWeight:"bold"}}>
                     {(contactno==9876543210)?<h3 style={{fontWeight:"bold"}}>Upload Solution</h3>:<h3 style={{fontWeight:"bold"}}>Upload Assignment</h3>}
        </Typography>
                {(contactno==9876543210?<form className={classes.form} noValidate  action = "/api/solutions" method="POST" encType="multipart/form-data">
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="email"
                        name="name"
                        value={name}
                        type="hidden"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="email"
                        name="email"
                        value={email}
                        type="hidden"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="contactno"
                        label="client's contact number here"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="subject"
                        label="Subject"
                        id="password"
                        
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="deadline"
                        type="date"
                        
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="range"
                        label="Price"
                        
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="assign"
                        label="Assignment"
                        
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="file"
                        type="file"                        
                    />


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color= "Secondary"
                        className={classes.submit}
                        style={{fontWeight:"bold",backgroundColor:"#010a43",color:"#fff"}}
                    >
                        Upload
          </Button>       
                </form>:<form className={classes.form} noValidate  action = "/api/upload" method="POST" encType="multipart/form-data">
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="email"
                        name="name"
                        value={name}
                        type="hidden"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="email"
                        name="email"
                        value={email}
                        type="hidden"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        type="hidden"
                        fullWidth
                        name="contactno"
                        value={contactno}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="subject"
                        label="Subject"
                        id="password"
                        
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="deadline"
                        type="date"
                        
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="range"
                        label="Price"
                        
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="file"
                        type="file"                        
                    />


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color= "Secondary"
                        className={classes.submit}
                        style={{fontWeight:"bold",backgroundColor:"#010a43",color:"#fff"}}
                    >
                        Upload
          </Button>       
                </form>)}
            </div>
        
        </Container>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: "#ff2e63",
        height:"80px",
        width:"80px"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));