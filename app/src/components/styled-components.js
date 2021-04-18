import styled, { css } from 'styled-components';

const flexbox = css(({ justify, align, block }) => (
    css`
        display: flex;
        justify-content: ${justify};
        align-items: ${align};
        width: ${block ? "100%" : null};
    `
));

export const Row = styled.div`
    ${flexbox}
    flex-direction: row;
`;

export const Col = styled.div`
    ${flexbox}
    flex-direction: column;
`;
