import { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Recipe({ match }) {
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3000/api/recipes/${match.params.id}`);
            if (response.status !== 200) {
                return alert("Error fetching posts");
            }
            const data = await response.json();
            setRecipe(data);
            setLoading(false);
        })();
    }, [match.params.id]);

    return (
        <div>
            
        </div>
    );
}
