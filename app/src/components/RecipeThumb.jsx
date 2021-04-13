import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { mdiClockTimeFourOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Row, Col } from './styled-components';

export default function RecipeThumb({ recipe = {} }) {
    const description = useRef();

    return (
        <Col
            height={description.current?.getBoundingClientRect()?.height} as={Wrapper}
            to={`/recipe/${recipe.id}/${recipe.name.replace(' ', '-')}`}
        >
            <Row justify="space-between" align="center" block>
                <Header>{recipe.name}</Header>
                <Time>{recipe.minutes}</Time>
                <TimeIcon />
            </Row>
            <DescriptionContainer>
                <Description ref={description}>{recipe.description}</Description>
            </DescriptionContainer>
        </Col>
    );
}

const Description = styled.p`
`;

const DescriptionContainer = styled.div`
    width: 100%;
    transition: 0.35s;
    overflow: hidden;
    height: 0;
`;

const Wrapper = styled(Link)`
    padding: 15px;
    width: 100%;
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    transition: 0.35s;
    box-shadow: 0 0 4px 0 black;
    ${({ theme, height }) => css`
    background-color: rgb(${theme.color.primary});
    border-radius: ${theme.borderRadius}px;
    &:hover {
        background-color: rgb(${theme.color.secondary});
        ${DescriptionContainer} {
            height: ${height}px;
            margin-top: 10px;
        }
    }
    `}
    `;

const Header = styled.h3`
    font-weight: normal;
    font-size: 1.75rem;
`;

const Time = styled.span`
    margin-left: auto;
`;

const TimeIcon = styled(Icon).attrs({ path: mdiClockTimeFourOutline })`
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 5px;
`;