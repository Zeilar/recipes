import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import * as Styles from './recipe.styles';

export default function EditRecipe({ data, closeEditMode }) {
    const [recipe, setRecipe] = useState({
        name: data.name,
        category: data.category,
        description: data.description,
        minutes: data.minutes,
        // image: data.image,
    });
    const [ingredients, setIngredients] = useState(data.ingredients);
    const [steps, setSteps] = useState(data.steps);

    function deleteIdKeys(array) {
        return array.map(element => {
            delete element.id;
            delete element.recipe_id;
            return element;
        });
    }

    async function submit() {
        const response = await fetch(`http://localhost:3000/api/recipes/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ recipe, ingredients: deleteIdKeys(ingredients), steps: deleteIdKeys(steps) }),
        });
        console.log(response);
    }

    return (
        <div>
            <TextInput value={recipe.name} onChange={e => setRecipe(recipe => ({ ...recipe, name: e.target.value }))} />
            <button onClick={submit}>Submit</button>
        </div>
    );
}

const input = css`
    ${Styles.gridItem}
    border: 0;
    padding: 12px;
    outline: 0;
    transition: 0.05s;
    ${({ theme }) => css`
        color: rgb(${theme.color.textPrimary});
        border-radius: ${theme.borderRadius}px;
        &:focus {
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.25), 0 0 0 2px rgba(${theme.color.bodyLight});
        }
    `}
`;

const TextInput = styled.input.attrs({ type: "text" })`
    ${input}
`;
