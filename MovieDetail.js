import React from 'react';
import {Link} from 'react-router-dom';
import './App.css'


const MovieDetail=(match)=>{
    return(
        <div>
            <img src={`http://image.tmdb.org/t/p/w300/${match.location.state.poster_path}`} alt="show"/>
            <h1>{match.location.state.title}<br/> Date of release:{match.location.state.release_date}</h1>
            <Link className="myButton" style={{float:"right"}} to="/">Back</Link>
        </div>
    );
}

export default MovieDetail;