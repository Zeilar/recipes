import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import useFetch from '../hooks/useFetch';
import Loader from './Loader';

export default function Recipe({ match }) {
    const { data: recipe, loading } = useFetch(`http://localhost:3000/api/recipes/${match.params.id}`);

    console.log(recipe, loading);

    return (
        <Wrapper>
            {loading && <Loader message="Loading your recipe" />}
            {recipe && (
                <article>
                    {recipe.name}
                </article>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.article`
    
`;
