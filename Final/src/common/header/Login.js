import React, {useState} from 'react';
import {ValidatorForm,TextValidator} from 'react-material-ui-form-validator'
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import './common.css';
import {useAppContext} from "../../screens/Logcontext";


export default function Login(props)
{

    const {setLoggedIn} = useAppContext()
    const [loginForm,setLoginForm]  = useState({
           myName :"",
           myPass: ""
       })
    const [accessToken,setAccessToken] = useState("");


    async function login()
        {
            try {
                const rawResponse = await fetch('http://localhost:8085/api/v1/auth/login', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "authorization": "Basic "+window.btoa(""+loginForm.myName+":"+loginForm.myPass),

                    }
                });
                const result = await rawResponse.json();
                if(rawResponse.ok)
                {
                    setAccessToken(rawResponse.headers.get("access-token"));
                    setLoggedIn(true)
                    props.ToggleModal()


                }
            }
            catch(e)
            {
                     alert("error");
            }

    }
    const inputChangedHandler = (e) => {
        const state = loginForm;
        state[e.target.name] = e.target.value;
        setLoginForm({...state})
    }

    const onFormSubmitted = async (e) => {
        e.preventDefault();
        await login(loginForm);
        setLoginForm({ myName:'',myPass:'' });

    }

    const {myName,myPass}=loginForm;

    return <div>
    <ValidatorForm className="validator-form" onSubmit={onFormSubmitted}>
        <FormControl required="true">
            <InputLabel htmlFor ="myName">Username</InputLabel>
            <Input id="myName" name ="myName" aria-describedby="my-username" onChange={inputChangedHandler}/>
        </FormControl> <br/>
        <FormControl required="true">
            <InputLabel htmlFor ="myPass">Password</InputLabel>
            <Input id="myPass" name ="myPass" type = "password" aria-describedby="my-username" onChange={inputChangedHandler}/>
        </FormControl><br/>
        < div className="Login-Button"> <Button variant="contained" color="primary" name="Login" type="Submit" >Login</Button></div>
    </ValidatorForm>
    </div>
}
