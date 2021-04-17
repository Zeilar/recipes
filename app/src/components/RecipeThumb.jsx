import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { mdiClockTimeFourOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Row, Col } from './styled-components';

export default function RecipeThumb({ recipe = {} }) {
    const [height, setHeight] = useState(0);
    const description = useRef();

    useEffect(() => {
        const element = description.current;
        if (element) {
            setHeight(element.getBoundingClientRect().height);
        }
    }, []);

    return (
        <Col
            to={`/recipe/${recipe.id}/${recipe.name.replace(' ', '-')}`}
            height={height} as={Wrapper} image={recipe.image}
        >
            <Row justify="space-between" align="center" block>
                <Header>{recipe.name}</Header>
                <Time>{recipe.minutes} min</Time>
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
    transition: height 0.4s, margin-top 0.4s;
    overflow: hidden;
    height: 0;
`;

const wrapperWithImage = css`
    background-position: top;
    background-size: cover;
    position: relative;
    z-index: 1;
    &::before {
        z-index: -1;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.75);
        border-radius: inherit;
    }
`;

const Wrapper = styled(Link)`
    padding: 20px;
    width: 100%;
    text-decoration: none;
    color: rgb(${({ theme }) => theme.color.textPrimary});
    display: flex;
    align-items: center;
    transition: 0.35s;
    box-shadow: 0 0 4px 0 black;
    &:hover {
        border-color: rgb(${({ theme }) => theme.color.textPrimary});
    }
    ${({ theme, height, image }) => css`
        border-bottom: 4px solid rgb(${theme.color.bodyLight});
        background-image: ${image && `url("/assets/recipe-images/${image}.jpg")`};
        border-radius: ${theme.borderRadius}px;
        ${image ? wrapperWithImage : css`
            background-color: rgb(${theme.color.textPrimary});
            color: rgb(${theme.color.textPrimary});
            &:hover {
                background-color: rgba(${theme.color.secondary});
            }
            &:active, &:focus {
                background-color: rgba(${theme.color.bodyLight});
                color: rgb(${theme.color.textPrimary});
            }
        `}
        &:active, &:focus, &:hover {
            ${DescriptionContainer} {
                height: ${height}px;
                margin-top: 10px;
            }
            ${Header} {
                text-decoration: underline;
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
    text-transform: uppercase;
    font-size: 0.85rem;
    font-family: Josefin Sans;
    letter-spacing: 1px;
`;

const TimeIcon = styled(Icon).attrs({ path: mdiClockTimeFourOutline })`
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 5px;
`;