import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

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
                {recipes.map(recipe => (
                    <RecipeThumb key={recipe.id} to={`/recipe/${recipe.id}/${recipe.name}`}>
                        <RecipeThumbHeader>{recipe.name}</RecipeThumbHeader>
                    </RecipeThumb>
                ))}
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
    grid-gap: 10px;
    width: 500px;
`;

const RecipeThumb = styled(Link)`
    padding: 15px;
    width: 100%;
    text-decoration: none;
    color: inherit;
    ${({ theme }) => css`
        background-color: rgb(${theme.color.primary});
        border-radius: ${theme.borderRadius}px;
    `}
`;

const RecipeThumbHeader = styled.h3`
    
`;
