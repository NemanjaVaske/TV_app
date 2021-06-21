import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';


const Items=({movies,shows,selector,setSelector,search,setSearch})=>{
    
    const renderMovies=<div className="movies" style={selector? {display: "none"} : {display:"block"} }>
    <h1>{`${search.length<3? 'Top 10 Movies:': 'Search Results of movies:'}`}</h1>
    {movies.map((movie)=>(
       <Link to={{pathname:`/moviedetail/${movie.id}`,state: movie}} key={movie.id} style={{textDecoration:"none"}}><h2   style={{color: "white"}}>{(movies.indexOf(movie,0)+1)}. {movie.title} ({movie.vote_average})</h2></Link>

        ))}
    </div>

    const renderShows=<div className="shows" style={!selector? {display: "none"} : {display:"block"}}>
    <h1>{`${search.length<3 ? 'Top 10 Shows:': 'Search Result of shows:'}`}</h1>
    {shows.map((show)=>(
        <Link to={{pathname:`/showdetail/${show.id}`,state: show}} key={show.id} style={{textDecoration:"none"}}><h2  style={{color: "white"}}>{(shows.indexOf(show,0)+1)}.  {show.name} ({show.vote_average})</h2></Link>
        ))}
    </div>

    const ShowingHandler=(e)=>{
        e.preventDefault();
        setSelector(!selector);
    }
    const searchHandler=(e)=>{
        e.preventDefault();
        setSearch(e.target.value);
    }
    return(
        <div>
            <div className="button">
            <button onClick={ShowingHandler} className="myButton">Top 10 Movies</button>
            <button onClick={ShowingHandler} className="myButton">Top 10 TvShows</button>
            </div>
            <form>
                <label>
                    <input className="input" type="text" onChange={searchHandler} value={search} placeholder="Search"/>
                </label>
                    
            </form>
            
                {selector? renderShows:renderMovies}
        </div>
    );
}

export default Items;