import { useState, useEffect } from 'react';
import styled from 'styled-components';
import RecipeThumb from './RecipeThumb';

export default function Home() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3000/api/recipes");
            if (response.status !== 200) {
                return alert("Error fetching posts");
            }
            const data = await response.json();
            setRecipes(data);
            setLoading(false);
        })();
    }, []);

    return (
        <Wrapper>
            <Recipes>
                {recipes.map(recipe => <RecipeThumb key={recipe.id} recipe={recipe} />)}
            </Recipes>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Recipes = styled.div`
    margin: 30px auto;
    display: grid;
    grid-gap: 15px;
    width: 500px;
`;
