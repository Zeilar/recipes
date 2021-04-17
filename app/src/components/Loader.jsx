import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { mdiPotSteamOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Col, Row } from './styled-components';

export default function Loader({ loading, message = null }) {
    return (
        <Wrapper as={Col} justify="center" align="center">
            <IconOutlined />
            <Dots as={Row} align="center">
                <Dot />
                <Dot />
                <Dot />
            </Dots>
            {message && <Message>{message}</Message>}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    color: rgb(${({ theme }) => theme.color.primary});
    padding: 5px;
`;

const IconOutlined = styled(Icon).attrs({ path: mdiPotSteamOutline })`
    width: 5rem;
    height: 5rem;
`;

const Message = styled.h3`
    font-weight: normal;
`;

const Dots = styled.div`
    margin: 5px 0;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(3, 1fr);
`;

const Dot = styled.span`
    @keyframes jump {
        50% {
            transform: scale(0.95) translateY(-2px);
            background-color: rgb(${({ theme }) => theme.color.bodyLight});
        }
    }
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: white;
    animation: jump 1s infinite ease-in-out;
    &:nth-child(2) {
        animation-delay: 0.25s;
    }
    &:nth-child(3) {
        animation-delay: 0.5s;
    }
`;
