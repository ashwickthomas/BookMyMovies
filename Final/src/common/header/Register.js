import React, {useState} from 'react';
import {ValidatorForm} from 'react-material-ui-form-validator'
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import './common.css';
import FormHelperText from "@material-ui/core/FormHelperText";

export default function Register()
{

    let isValid = false;
   const [signupForm,setSignupForm]  = useState({

       myFirstName :'',
       myLastName:'',
       myEmail:'',
       myPassword:'',
       myContact:''
   });

   const  [userState,setUserState] = useState({
        id:"",
        status:"",
    })

    const [validMessage,setValidMessage] = useState(" ")
    const [reqFirstName,setReqFirstName] = useState("dispNone")
    const [reqLastName,setReqLastName] = useState("dispNone")
    const [reqEmail,setReqEmail] = useState("dispNone")
    const [reqPass,setReqPass] = useState("dispNone")
    const [reqNumber,setReqNumber] = useState("dispNone")

    async  function register() {
       try {

           const rawResponse = await fetch('http://localhost:8085/api/v1/signup', {
               method: 'POST',
               headers: {
                   "Content-Type": "application/json;charset=UTF-8",
                   "Accept": "application/json"
               },
               body: JSON.stringify({

                   "email_address": signupForm.myEmail,
                   "first_name": signupForm.myFirstName,
                   "last_name": signupForm.myLastName,
                   "mobile_number": signupForm.myContact,
                   "password": signupForm.myPassword
               })

           });


           if (rawResponse.ok) {
               setValidMessage("Registration Successful.Please Login!")

           }
       }

       catch (e)
      {
          alert("error");
      }

 }

   const inputChangeHandler = (e) =>
    {
        const state = signupForm;
        state[e.target.name] = e.target.value;
        setSignupForm({...state})

    }

    const onFormSubmitted = async (e) =>
    {
        e.preventDefault();

        myFirstName === "" ? setReqFirstName("dispBlock"):setReqFirstName("dispNone");
        myLastName === "" ? setReqLastName("dispBlock"):setReqLastName("dispNone");
        myEmail === "" ? setReqEmail("dispBlock"):setReqEmail("dispNone");
        myPassword === "" ? setReqPass("dispBlock"):setReqPass("dispNone");
        myContact === "" ? setReqNumber("dispBlock"):setReqNumber("dispNone");

        await register();
        setSignupForm({myFirstName :'',myLastName:'',myEmail: '',myPassword: '',myContact: '' })

    }
    const {myFirstName,myLastName,myEmail,myPassword,myContact}=signupForm;

    return <div>
        <ValidatorForm className="validator-form" >
            <FormControl required="true">
                <InputLabel htmlFor ="myFirstName">First Name</InputLabel>
                <Input id="myFirstName" name="myFirstName"type="name" aria-describedby="my-helper-text" onChange={inputChangeHandler}/>
                <FormHelperText className={reqFirstName}>
                    <span className="red">Required</span>
                </FormHelperText>
            </FormControl> <br/>
            <FormControl required="true">
                <InputLabel htmlFor ="myLastName">Last Name</InputLabel>
                <Input id="myLastName" name ="myLastName" type = "name" aria-describedby="my-helper-text" onChange={inputChangeHandler}/>
                <FormHelperText className={reqLastName}>
                    <span className="red">Required</span>
                </FormHelperText>
            </FormControl><br/>
            <FormControl required="true">
                <InputLabel htmlFor ="myEmail">Email</InputLabel>
                <Input id="myEmail" name ="myEmail" type = "email" aria-describedby="my-helper-text" onChange={inputChangeHandler}/>
                <FormHelperText className={reqEmail}>
                    <span className="red">Required</span>
                </FormHelperText>
            </FormControl><br/>
            <FormControl required="true">
                <InputLabel htmlFor ="myPassword">Password</InputLabel>
                <Input id="myPassword" name="myPassword" type = "password" aria-describedby="my-helper-text" onChange={inputChangeHandler}/>
                <FormHelperText className={reqPass}>
                    <span className="red">Required</span>
                </FormHelperText>
            </FormControl><br/>
            <FormControl required="true">
                <InputLabel htmlFor ="myContact">Contact No</InputLabel>
                <Input id="myContact" name ="myContact" type = "contact-no" aria-describedby="my-helper-text" onChange={inputChangeHandler}/>
                <FormHelperText className={reqNumber}>
                    <span className="red">Required</span>
                </FormHelperText>
            </FormControl><br/>
            <h6 style = {{textAlign:"center",font:"small-caption"}}>{validMessage}</h6>
            < div className="Login-Button"> <Button variant="contained" color="primary" name="Login" type="submit" onClick ={onFormSubmitted} >Register</Button></div>
        </ValidatorForm>
    </div>
}
