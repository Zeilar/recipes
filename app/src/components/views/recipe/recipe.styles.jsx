import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Col, Row, gridItem } from '../../styled-components';
import Icon from '@mdi/react';

export const Wrapper = styled.div.attrs({ justify: "center" })`
    padding: 30px;
    height: 100%;
    display: flex;
`;

export const Body = styled.article`
    width: 1200px;
    margin: auto;
`;

export const Header = styled(Row)`
    ${gridItem}
`;

export const Banner = styled.img.attrs({ loading: "lazy" })`
    width: 60%;
    object-fit: cover;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
`;

export const HeaderMeta = styled(Col)`
    padding: 30px;
`;

export const Title = styled.h1`
    font-family: Josefin Sans;
    font-size: 2rem;
`;

export const Description = styled.p`
    margin-top: 15px;
    font-family: Libre Franklin;
`;

export const Stats = styled.aside.attrs({ align: "center" })`
    margin-top: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
`;

export const Stat = styled(Col).attrs({ align: "center" })`

`;

export const StatText = styled.span`
    font-size: 1rem;
`;

export const StatIcon = styled(Icon)`
    width: 2rem;
    height: 2rem;
    margin-bottom: 5px;
`;

export const Author = styled(NavLink)`
    margin: 15px 0;
    font-weight: bold;
    color: rgb(${({ theme }) => theme.color.link});
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export const Instructions = styled.div`
    margin-top: 30px;
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(2, 1fr);
    align-items: flex-start;
`;

export const Instruction = styled.div`
    
`;

export const InstructionHeader = styled.h2`
    margin-bottom: 10px;
    font-family: Josefin Sans;
`;

export const InstructionContent = styled.div`
    ${gridItem}
    padding: 30px;
    grid-gap: 30px;
    display: grid;
`;

export const Ingredient = styled(Row).attrs({ align: "center" })`

`;

export const IngredientAmount = styled.div`
    width: 5rem;
    font-weight: bold;
`;

export const IngredientText = styled.p`
    
`;

export const StepNumber = styled.span`
    margin-right: 10px;
    font-family: Rubik;
    font-size: 1.5rem;
    width: 1rem;
    transition: 0.05s;
`;

export const StepText = styled.p`
    transition: 0.05s;
`;

export const Step = styled(Row).attrs({ align: "center" })`
    ${({ checked }) => checked && css`
        ${StepText}, ${StepNumber} {
            opacity: 0.35;
        }
    `}
`;
