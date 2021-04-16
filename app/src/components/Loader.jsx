import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { mdiPotSteamOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Col } from './styled-components';

export default function Loader({ loading, message = null }) {
    return (
        <Wrapper as={Col} justify="center" align="center">
            <IconOutlined />
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