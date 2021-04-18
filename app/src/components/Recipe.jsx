import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import useFetch from '../hooks/useFetch';
import Loader from './Loader';
import { Col, Row } from './styled-components';
import { mdiClockTimeFourOutline, mdiFormatListCheckbox, mdiFoodVariant } from '@mdi/js';
import Icon from '@mdi/react';
import { NavLink } from 'react-router-dom';

function pluralize(string, number) {
    return number > 1 ? `${string}s` : string;
}

export default function Recipe({ match }) {
    const { data: recipe, loading } = useFetch(`http://localhost:3000/api/recipes/${match.params.id}`);

    return (
        <Wrapper as={Col} justify="center">
            {loading && <Loader message="Loading your recipe" />}
            {recipe && (
                <Body>
                    <Header>
                        <HeaderMeta>
                            <Title>{recipe.name}</Title>
                            <Author to={`/user/${recipe.user.id}`}>A recipe by {recipe.user.username}</Author>
                            <Description>{recipe.description}</Description>
                            <Row as={Stats} align="center">
                                <Stat>
                                    <StatIcon path={mdiClockTimeFourOutline} />
                                    <StatText>{recipe.minutes} {pluralize("minute", recipe.minutes)}</StatText>
                                </Stat>
                                <Stat>
                                    <StatIcon path={mdiFoodVariant} />
                                    <StatText>{recipe.ingredients.length} {pluralize("ingredient", recipe.ingredients.length)}</StatText>
                                </Stat>
                                <Stat>
                                    <StatIcon path={mdiFormatListCheckbox} />
                                    <StatText>{recipe.steps.length} {pluralize("step", recipe.steps.length)}</StatText>
                                </Stat>
                            </Row>
                        </HeaderMeta>
                        <Banner src={`/assets/recipe-images/${recipe.image}.jpg`} />
                    </Header>
                    <Ingredients>
                        {recipe.ingredients.map(ingredient => (
                            <Ingredient key={ingredient.id}>{ingredient.name}</Ingredient>
                        ))}
                    </Ingredients>
                </Body>
            )}
        </Wrapper>
    );
}

const gridItem = css`
    background-color: rgb(${({ theme }) => theme.color.bodyDark});
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    border-radius: ${({ theme }) => theme.borderRadius}px;
`;

const Wrapper = styled.div`
    padding: 30px;
    height: 100%;
    display: flex;
`;

const Body = styled.article`
    width: 1200px;
    margin: auto;
`;

const Header = styled(Row)`
    ${gridItem}
`;

const Banner = styled.img.attrs({ loading: "lazy" })`
    width: 60%;
    object-fit: cover;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
`;

const HeaderMeta = styled(Col)`
    padding: 30px;
`;

const Title = styled.h1`
    font-family: Josefin Sans;
    font-size: 2rem;
`;

const Description = styled.p`
    margin-top: 15px;
    font-family: Libre Franklin;
`;

const Stats = styled.aside`
    margin-top: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
`;

const Stat = styled(Col).attrs({ align: "center" })`

`;

const StatText = styled.span`
    font-size: 1rem;
`;

const StatIcon = styled(Icon)`
    width: 2rem;
    height: 2rem;
    margin-bottom: 5px;
`;

const Author = styled(NavLink)`
    margin: 15px 0;
    font-weight: bold;
    color: rgb(${({ theme }) => theme.color.link});
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const Ingredients = styled.div`
    ${gridItem}
`;

const Ingredient = styled.div`
    ${gridItem}
`;
