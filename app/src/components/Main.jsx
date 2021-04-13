import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { css } from 'styled-components';
import Home from "./Home";
import Recipe from "./Recipe";

export default function Main() {
    return (
        <Wrapper>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/recipe/:id/:name?" exact>
                        <Recipe />
                    </Route>
                </Switch>
            </Router>
        </Wrapper>
    );
}

const Wrapper = styled.main`
    ${({ theme }) => css`
        min-height: 100vh;
        background-color: rgb(${theme.color.body});
        color: rgb(${theme.color.textPrimary});
    `}
`;
