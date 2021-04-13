import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { mdiClockTimeFourOutline } from '@mdi/js';
import Icon from '@mdi/react';

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
                    <RecipeThumb key={recipe.id} to={`/recipe/${recipe.id}/${recipe.name.replace(' ', '-')}`}>
                        <RecipeThumbHeader>{recipe.name}</RecipeThumbHeader>
                        {recipe.minutes && (
                            <>
                                <RecipeThumbTime>{recipe.minutes}</RecipeThumbTime>
                                <RecipeThumbTimeIcon />
                            </>
                        )}
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
    display: flex;
    font-size: 1.5rem;
    align-items: center;
    transition: 0.35s transform;
    box-shadow: 0 0 4px 0 black;
    ${({ theme }) => css`
        background-color: rgb(${theme.color.primary});
        border-radius: ${theme.borderRadius}px;
        &:hover {
            background-color: rgb(${theme.color.secondary});
            transform: scale(1.02);
        }
    `}
`;

const RecipeThumbHeader = styled.h3`
    font-weight: normal;
`;

const RecipeThumbTime = styled.span`
    margin-left: auto;
`;

const RecipeThumbTimeIcon = styled(Icon).attrs({ path: mdiClockTimeFourOutline })`
    width: 1.5rem;
    height: 1.5rem;
`;
