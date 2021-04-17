import { useEffect, useContext } from 'react';
import styled from 'styled-components';
import useFetch from '../hooks/useFetch';
import { UserContext } from './contexts/UserContext';
import RecipeThumb from './RecipeThumb';
import { mdiChefHat } from '@mdi/js';
import Icon from '@mdi/react';
import { Row } from './styled-components';
import Loader from './Loader';

export default function Home() {
    const { user } = useContext(UserContext);

    const { data: recipes, loading } = useFetch("http://localhost:3000/api/recipes");

    useEffect(() => {
        console.log(user)
    }, [user]);

    return (
        <Wrapper>
            <Header as={Row} justify="center" align="center">
                <Title>Angelin</Title>
                <TitleIcon />
                <Title>Recipes</Title>
            </Header>
            {loading && <Loader message="Preparing your meals" />}
            <Recipes>
                {!loading && recipes.map(recipe => <RecipeThumb key={recipe.id} recipe={recipe} />)}
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

const Header = styled.header`
    padding: 60px;
`;

const Title = styled.h1`
    color: rgb(${({ theme }) => theme.color.textPrimary});
    font-family: Lobster;
    letter-spacing: 3px;
    text-align: center;
    font-size: 3rem;
    font-weight: normal;
`;

const TitleIcon = styled(Icon).attrs({ path: mdiChefHat })`
    color: rgb(${({ theme }) => theme.color.bodyLight});
    width: 4rem;
    height: 4rem;
    margin: 0 15px;
`;
