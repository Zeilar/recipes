import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import useFetch from '../hooks/useFetch';

export default function Recipe({ match }) {
    const { data, loading } = useFetch(`http://localhost:3000/api/recipes/${match.params.id}`);

    console.log(data, loading);

    return (
        <Wrapper>
            {data.name}
        </Wrapper>
    );
}

const Wrapper = styled.article`
    ${({ theme }) => css`
        background-color: rgb(${theme.color.bodyLight});
    `}
`;
