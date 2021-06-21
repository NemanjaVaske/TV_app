import React ,{useState,useEffect}from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.css';
import Items from './Items';
import ShowDetail from './ShowDetail';
import MovieDetail from './MovieDetail';


const App=()=>{
    
    const[movies,setMovies]=useState([]);
    const[shows,setShows]=useState([]);
    const[selector,setSelector]=useState(true);
    const[search,setSearch]=useState('');
    const[searchResultMovies,setSearchResultMovies]=useState([]);
    const[searchResultShows,setSearchShowsResult]=useState([]);

    

    useEffect(()=>{
        fetchMovies();
        fetchSHOW();
    },[]);

    useEffect(()=>{
        fetchMoviesResult();
        fetchShowsResult();
    },[search]);

    const fetchMovies=async()=>{
        const data=await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=9c601addd1a00112064c9f21873b3f3c&language=en-US&page=1');
        const movies=await data.json();
        console.log(movies.results.slice(0,10));
        setMovies(movies.results.slice(0,10));
        
        
    }

    const fetchSHOW=async()=>{
        const data=await fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=9c601addd1a00112064c9f21873b3f3c&language=en-US&page=1');
        const shows=await data.json();
        console.log(shows.results.slice(0,10));
        setShows(shows.results.slice(0,10));
    }

    const fetchMoviesResult=async()=>{ 
        const data=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9c601addd1a00112064c9f21873b3f3c&language=en-US&query=${search.length<1?'a':search}&page=1&include_adult=false`);
        const movies=await data.json();
        setSearchResultMovies(movies.results);

    }

    const fetchShowsResult=async()=>{
        const data=await fetch(`https://api.themoviedb.org/3/search/tv?api_key=9c601addd1a00112064c9f21873b3f3c&language=en-US&page=1&query=${search.length<1?'a':search}&include_adult=false`);
        const shows=await data.json();
        setSearchShowsResult(shows.results);
    }
    
    

    return(
        <div className="app">
            <Router>
                <Switch>
                <Route path="/" exact render={(props)=>(<Items {...props} movies={search.length<3? movies:searchResultMovies} shows={search.length<3? shows: searchResultShows} selector={selector} setSelector={setSelector} search={search} setSearch={setSearch}/>)} />
                <Route path="/showdetail/:id" component={ShowDetail}/>
                <Route path="/moviedetail/:id" component={MovieDetail} />
                </Switch>       
            </Router>
        </div>
        
    );
}

export default App;