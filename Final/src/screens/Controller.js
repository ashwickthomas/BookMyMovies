import React, {useState} from 'react';
import Details from "./details/Details";
import BookShow from "./bookshow/BookShow";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./home/Home";
import {AppContext} from "./Logcontext";



export default function Controller(){

    const[isLoggedIn,setLoggedIn] = useState(false)

    return <div>
        <AppContext.Provider value= {{isLoggedIn,setLoggedIn}}>
        <Router>
            <Switch>
                <Route exact path="/" render={(props) => <Home {...props}/>}/>
                <Route exact path="/movie/:id" render={(props) => <Details {...props}/>}/>
                <Route exact path="/bookShow/:id" render={(props) => <BookShow {...props}/>}/>
            </Switch>
        </Router>
        </AppContext.Provider>
    </div>
}