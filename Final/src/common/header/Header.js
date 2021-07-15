import React, {useState} from 'react';
import './Header.css';
import Logo from "../../assets/logo.svg";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Login from "./Login";
import Register from "./Register";
import {useAppContext} from "../../screens/Logcontext";


export default function Header (props) {

    const {isLoggedIn,setLoggedIn} = useAppContext()
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = React.useState(0);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

           const handleChange = (event, newValue) => {
            setValue(newValue);}

            function onLogoutHandler() {
            setLoggedIn(false)
        }

    return <div className="Heading">
             <img className="Logo" src={Logo} alt="Logo"/>
                <div className="Buttons">{
                        isLoggedIn ?
                            <div className="Button2"><Button variant="contained" color = "default" name="Logout"onClick={onLogoutHandler}>Logout</Button></div>
                             :<div classNme="Button1"><Button variant="contained" color = "default" name="Login" onClick={toggleModal}>Login</Button></div>


                    }

                    <div className="CustomModel">
                         <Modal
                            isOpen={isOpen}
                            onRequestClose={toggleModal}

                          style={{
                            overlay: {
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            },
                            content: {
                                position: 'absolute',
                                top: '20%',
                                left: '40%',
                                height: 'fit-content',
                                width: 'fit-content',
                                background: '#fff',
                                outline: 'none',
                                padding: '0px',
                            }
                        }}
                    >
                        <div className="Form">
                            <Paper >
                                <Tabs value={value} onChange={handleChange} indicatorColor="secondary" textColor="black" centered>
                                    <Tab label="Login" />
                                    <Tab label="Register" />
                                </Tabs>
                                   <TabPanel value={value} index={0}><Login ToggleModal={toggleModal}/></TabPanel>
                                   <TabPanel value={value} index={1}><Register/></TabPanel>
                            </Paper>
                        </div>
                    </Modal>
                    </div>
                    <div className="BookButton">
                        {props.Book?
                            <Link to ={"/bookShow/"+props.id}>
                                <Button variant="contained" color="primary" name="Book" >Book Show</Button>
                            </Link>
                            :null}
                    </div>
           </div>
    </div>
}


function TabPanel(props)
{
    const {children,value,index} = props;
    return(
        <div>{
            value===index && (<div>{children}</div>)

        }</div>
    )
}