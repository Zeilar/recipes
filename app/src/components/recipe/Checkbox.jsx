import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';
import { Row } from '../styled-components';

export default function Checkbox({ ...props }) {
    const [checked, setChecked] = useState(false);

    return (
        <Wrapper checked={checked} onClick={() => setChecked(checked => !checked)} {...props}>
            {checked && <CheckIcon />}
        </Wrapper>
    );
}

const Wrapper = styled(Row).attrs({ justify: "center", align: "center" })`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    margin-right: 15px;
    transition: 0.05s;
    border: 2px solid rgb(${({ theme }) => theme.color.bodyLight});
    border-radius: ${({ theme }) => theme.borderRadius}px;
    ${({ checked }) => checked && css`
        background-color: rgb(${({ theme }) => theme.color.bodyLight});
    `}
`;

const CheckIcon = styled(Icon).attrs({ path: mdiCheck })`
    width: 1rem;
    height: 1rem;
`;
