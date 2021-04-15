import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from './contexts/UserContext';
import RecipeThumb from './RecipeThumb';

export default function Home() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log(user)        
    }, [user]);

    async function login() {
        await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "Philip",
                password: "123",
            }),
        });
    }

    async function auth() {
        await fetch("http://localhost:3000/api/auth");
    }

    async function logout() {
        await fetch("http://localhost:3000/api/auth/logout");
    }

    useEffect(() => {
        (async () => {
            const response = await fetch("http://localhost:3000/api/recipes");
            if (response.status !== 200) {
                return alert("Error fetching posts");
            }
            const data = await response.json();
            setRecipes(data);
            setLoading(false);
        })();
    }, []);

    return (
        <Wrapper>
            <button onClick={login} style={{ margin: 50 }}>Login</button>
            <button onClick={auth} style={{ margin: 50 }}>Authenticate</button>
            <button onClick={logout} style={{ margin: 50 }}>Logout</button>
            <Recipes>
                {recipes.map(recipe => <RecipeThumb key={recipe.id} recipe={recipe} />)}
            </Recipes>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Recipes = styled.div`
    margin: 30px auto;
    display: grid;
    grid-gap: 15px;
    width: 500px;
`;
