import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Header  from "../../common/header/Header";
import './Home.css'
import {
    CardHeader,
    Checkbox,
    GridList,
    GridListTile,
    GridListTileBar, ListItemText,
    TextField
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from "react-router-dom";


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
export default function Home(props) {


    const [movies,setMovies] = useState([]);
    const [filteredMovieGenres,setFilteredMovieGenres] = useState([]);
    const [movieGenres,setMovieGenres] = useState([]);
    const [actors,setActors] = useState([])
    const [filteredActor,setFilteredActor] = useState([])
    const [filteredMovie,setFilteredMovie]  = useState({
        "movieName": '',
        "releaseDateStart": new Date(),
        "releaseDateEnd"  : new Date()
    })
    const[filterOn,setFilterOn] = useState(false)

    const genreHandleChange = (event) => {setFilteredMovieGenres(event.target.value);setFilterOn(true)};
    const actorHandleChange = (event) => {setFilteredActor(event.target.value);setFilterOn(true)};

    const inputChangedHandler = (e) => {
        const state = filteredMovie;
        state[e.target.name] = e.target.value;
        setFilteredMovie({...state})
    }

    async function movieDetails() {
        try {
            const rawResponse = await fetch('http://localhost:8085/api/v1/movies?page=1&limit=10', {
                method: 'GET',
                headers: {
                    "Accept": "application/json;charset=UTF-8"

                }
            });
            const result = await rawResponse.json();
            setMovies(result["movies"]);
        } catch (e) {
            alert("error");
        }
    }
    async function getGenres() {
     try{
         const rawResponse = await fetch("http://localhost:8085/api/v1/genres",{

             method: 'GET',
             headers: {
                 "Accept": "application/json;charset=UTF-8"

             }
         });

         if(rawResponse.ok)
         {

             const result = await rawResponse.json();
             setMovieGenres(result["genres"])
         }

    }


    catch (e)

    {
      alert("error")
    }


    }
    async function getArtists() {
    try{

    const rawResponse = await fetch ('http://localhost:8085/api/v1/artists?page=1&limit=10',{


        method:'GET',
        headers:
            {
                "Accept": "application/json;charset=UTF-8"
            }
    });

    if(rawResponse.ok)
    {
        const result = await rawResponse.json()
        setActors(result["artists"])
    }
}

catch (e)
{

}
}
    async function getDetails(){
        await movieDetails();
        await getGenres();
        await getArtists();

    }

    function filterResult (){

        setFilterOn(true);
    }
    const {movieName,releaseDateStart,releaseDateEnd} = filteredMovie

    return <div onLoad={getDetails}>
        <Header/>
        <div className="upcom">
            Upcoming Movies
        </div>
        <div className='gridUpcom'>
            <GridList cols={6} style={{flexWrap:'nowrap', width:'100%',}}>

                {movies.filter(mov => mov.status != "RELEASED")
                    .map(movie => (
                    <GridListTile key={movie["id"]} style={{border:'1px solid lightGrey'}}>
                        <img src={movie["poster_url"]} alt="image" style={{height:'100%'}}/>
                        <GridListTileBar title={movie["title"]}/>
                    </GridListTile>
                ))}
            </GridList>

        </div>
            <div className= "gridRelease">
                <div className="releaseList">

                    <GridList cols ={4} >
                        {movies.filter(mov => {
                            if(!filterOn) return mov.status === "RELEASED"
                            else return (mov.status === "RELEASED" &&
                                ((mov.title.toLowerCase() === filteredMovie.movieName.toLowerCase()) ||
                                    (new Date(mov.release_date) >= new Date(filteredMovie.releaseDateStart)
                                        && new Date(mov.release_date) <= new Date(filteredMovie.releaseDateEnd)) ||
                                    (mov.genres.every(val => filteredMovieGenres.includes(val))) ||
                                    (mov.artists
                                        .map(artist =>(artist["first_name"]+" "+artist["last_name"]))
                                        .forEach(val1 =>filteredActor.includes(val1)))))
                        } )
                            .map(movie =>
                            <GridListTile key = {movie["id"]} style={{height:'350px',cursor:"pointer",marginleft:'4px'}}>
                               <Link to={"/movie/"+movie["id"]}>
                               <img src ={movie["poster_url"]}alt ="image"
                                    style={{minWidth:'100%',minHeight:'100%',maxWidth:'100%',maxHeight:'100%'}}/>
                               </Link>
                                <GridListTileBar title={movie["title"]}
                                                 subtitle={"Release Date "+new Date(movie.release_date).toDateString()}/>
                            </GridListTile>
                        )
                        })}
                    </GridList>
                </div>

        <div className="filter">
            <Card>
            <CardContent style={{margin:'16px',minWidth:'',maxWidth:'240px',minHeight:'350px'}}>
                <CardHeader title={<Typography variant='h6' style={{color:'cornFlowerBlue',width:'100%'}} >Find Movies By</Typography> } color="theme.palette.primary.light" />
                <FormControl>
                    <InputLabel htmlFor="movieName" >Movie Name</InputLabel>
                    <Input id="movieName" name="movieName" aria-describedby="my-helper-text" onInput={inputChangedHandler} />
                </FormControl> <br/>


                <FormControl style={{minWidth:185}}>
                    <InputLabel htmlFor="genres">Genres</InputLabel>
                    <Select labelId="label" id="genres" multiple value={filteredMovieGenres} onChange={genreHandleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps}>
                        {movieGenres.map((genres) => (
                            <MenuItem key={genres.id} value={genres["genre"]}>
                                <Checkbox checked={filteredMovieGenres.indexOf(genres["genre"]) > -1} />
                                <ListItemText primary={genres["genre"]} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl> <br/>


                <FormControl style={{minWidth:185}}>
                <InputLabel htmlFor="Actors">Actors</InputLabel>
                <Select labelId="label" id="genres" multiple value={filteredActor} onChange={actorHandleChange} input={<Input />}
                        renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps}>
                    {actors.map((actor) => (
                        <MenuItem key={actor.id} value={actor["first_name"]+" "+actor["last_name"]}>
                            <Checkbox checked={filteredActor.indexOf(actor["first_name"]) > -1} />
                            <ListItemText primary={actor["first_name"]+" "+actor["last_name"]} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl> <br/>


                <FormControl style={{minWidth:185}}>
                    <TextField
                        id="releaseDateStart"
                        label="Release Date Start"
                        type="date"
                        name="releaseDateStart"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={inputChangedHandler}
                        />
                </FormControl> <br/>
                <FormControl style={{minWidth   :185}}>
                    <TextField
                        id="releaseDateEnd"
                        label="Release Date end"
                        type="date"
                        name="releaseDateEnd"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={inputChangedHandler}
                    />
                </FormControl> <br/>
            </CardContent>
                <Button variant="contained" color="primary" name="Apply" style={{minWidth:185,left:35,bottom:30}} onClick={filterResult}>Apply</Button>
            </Card>
        </div>
            </div>
    </div>
}
