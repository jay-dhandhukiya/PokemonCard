import { useState, useEffect } from "react"
import './index.css'
import Pokemoncards from "./Pokemoncards"
export const Pokemon = () => {
       const API = "https://pokeapi.co/api/v2/pokemon?limit=151";
       const [search, setSearch] = useState("")
       //useState use for store the data
       const [pokemon, setPokemon] = useState([])
       //error state use for show the error
       const [error, setError] = useState(null)
       //loding state use for show the loader
       const [loading, setLoading] = useState(true)
       const fetchPokemon = async () => {
          try {
          //fetch api
             const res = await fetch(API)
             const data = await res.json()
               //console.log(data)


          //fetch the api results for each pokemon
             const detailedPokemonData = data.results.map( async (curPokemon) => {
                  const res = await fetch(curPokemon.url)
                  const data = await res.json()
                  return data
             })

               const detailedResponses = await Promise.all(detailedPokemonData);
               console.log(detailedResponses);
               setPokemon(detailedResponses);
             //loading false use for hide the loader
             setLoading(false)
          }
          catch (error) {
               console.log(error)
               setLoading(false)
               setError(error)
          }
     }
       useEffect(() => {
         fetchPokemon()
       }, [])
       //search the pokemon
       const searchData = pokemon.filter((curPokemon) =>
          curPokemon.name.toLowerCase().includes(search.toLowerCase())
       )
       //loading show the loading... in web
       if(loading) return <div><h1>Loading...</h1></div>
       //error show the error in web
       if(error) return <div><h1>{error.message}</h1></div>
     return (
          <>
          <section className="container">
               <header>
                    <h1> Lets  Catch Pokemon</h1>
               </header>
               <div className="pokemon-search">
                    <input 
                    type="text" 
                    placeholder="Search Pokemon" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
               />
               </div>
               <div>
                    <ul className="cards">
                         {    
                              //map the pokemon data and return the pokemon cards
                              //{ pokemon.map((curPokemon) =>{ }
                              searchData.map((curPokemon) =>{
                                 return  <Pokemoncards key={curPokemon.id} pokemonData={curPokemon} />
                              })
                         }
                    </ul>
               </div>
          </section>

          </>
     )
}