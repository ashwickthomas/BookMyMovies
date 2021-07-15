import React, {useState} from 'react'
import Header from "../../common/header/Header";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import './Details.css'
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {Rating} from "@material-ui/lab";
import {GridList, GridListTile, GridListTileBar, makeStyles} from "@material-ui/core";
import YouTube from "react-youtube";


const movieDetails = {

    title: 'Inception',
    Genre:'Action',
    Duration:'148',
    ReleaseDate: 'Fri jul6 2010',
    Rating:'9',
    Plot:'ffhfl',
    Trailer:'qjfjq',
}

const tileData = [
    {
        id:1,
        title: 'Gallery 1',
        author: 'author'
    },
    {
        id:2,
        title: 'Gallery 2',
        author: 'author'
    },
    {
        id:3,
        title: 'Gallery 3',
        author: 'author'
    },
    {
        id:4,
        title: 'Gallery 4',
        author: 'author'
    },
]

export default function Details(props) {

    const [movieInfo,setMovieInfo] = useState({});
    const[videoId,setVideoId] = useState("")
    const [genres,setGenres] = useState([]);
    const [actors,setActors] = useState([])

     async function selectedMovieInfo() {
        try{
           const rawResponse = await fetch('http://localhost:8085/api/v1/movies/'+props.match.params.id, {
                  method:'GET',
                  headers:{
                    "Accept": "application/json;charset=UTF-8"
                   }
                   });
          const result = await rawResponse.json();
          if(rawResponse.ok){
              setMovieInfo(result);
              setVideoId(result["trailer_url"])
              setGenres(result["genres"]);
              setActors(result["artists"])
          }
        }
        catch (e)
        {
            alert("Error")
        }


    }
    return <div onLoad={selectedMovieInfo}>
        <Header Book={true} id = {props.match.params.id}/>
        <div className="back">
        <Typography >
            <Link to={"/"}>
                &#60; Back to Home
            </Link>
        </Typography>
        </div>
        <div className = "detailsGrid">
            <div className= "left">
                <img src ={movieInfo["poster_url"]} alt="poster" style={{minWidth:'80%',minHeight:'50%',maxWidth:'80%',maxHeight:'50%'}}/>
            </div>
            <div className="mid">
                <Typography variant='h2'>{movieInfo["title"]}</Typography> <br/>
                <Typography><b>Genre: </b>{
                    genres.map(function(item, index) {
                        return <span key={`genre${index}`}>{ (index ? ', ' : '') + item }</span>;
                    })
                }</Typography>
                <Typography ><b>Duration: </b>{movieInfo["duration"]}</Typography>
                <Typography ><b>Release Date: </b>{new Date(movieInfo["release_date"]).toDateString()}</Typography>
                <Typography ><b>Rating: </b>{movieInfo["rating"]}</Typography><br/>
                <Typography style={{marginTop:'16px'}}><b>Plot: </b><a href={movieInfo["wiki_url"]}>Wiki Link</a> {movieInfo["storyline"]}  </Typography><br/>
                <Typography style={{marginTop:'16px'}}><b>Trailer: <br/> </b><YouTube videoId={videoId.substring(videoId.indexOf('=')+1)}/></Typography><br/>
            </div>
            <div className="right">
            <Typography ><b>Rate This Movie: </b><br/>
                <Rating emptyIcon={<StarBorderIcon fontSize="inherit"/>}/> <br/><br/>
                <Typography><b>Artists: </b></Typography>
                <div className="artists">
                    <GridList cols={2}>
                        {actors.map(actor => (
                            <GridListTile key={actor.id} style={{border:'1px solid lightGrey'}}>
                                <img src={actor.profile_url} alt="image" style={{minWidth:'100%',minHeight:'100%',maxWidth:'100%',maxHeight:'100%'}}/>
                                <GridListTileBar title={actor.first_name+" "+actor.last_name}/>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </Typography>
                </div>
        </div>
    </div>
}