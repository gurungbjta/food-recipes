import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  // we got these recipe API from edamam.com
  // we have to include these id and key that is unique to each user
  const APP_ID = '05ce81dc';
  const APP_KEY = '2fb007272e25ccda99fd919a6f7215aa';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken'); // let's say initially query is set to 'chicken'
 
  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line
  }, [query]); // refresh when only query changes

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);

    // could've done this way as well
    // fetch(`blablabla`)
    // .then(response => {response.json})
  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  // get query
  const getSearch = (e) => {
    e.preventDefault(); // stops page refresh
    setQuery(search); // set query to whatever we type in search
    setSearch(''); // reset search bar
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.label} 
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients} />
        ))}
      </div>
    </div>
  )
}

export default App;
