import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import useFetch from '../../../hooks/useFetch';
import { Input, TextInput, NumberInput, Label, Textarea } from '../../styled-components';

export default function EditRecipe({ match }) {
    const [recipe, setRecipe] = useState();
    const [ingredients, setIngredients] = useState();
    const [steps, setSteps] = useState();

    const { data, loading, error } = useFetch(`http://localhost:3000/api/recipes/${match.params.id}`);

    useEffect(() => {
        if (data) {
            setRecipe({
                name: data.name,
                category: data.category,
                description: data.description,
                minutes: data.minutes,
                image: data.image,
            });
            setIngredients(data.ingredients);
            setSteps(data.steps);
        }
    }, [data]);

    function updateRecipe(key, value) {
        setRecipe(recipe => ({ ...recipe, [key]: value }));
    }

    function addIngredient(ingredient) {
        setIngredients(ingredients => [...ingredients, ingredient]);
    }

    function removeIngredient(ingredient) {
        setIngredients(ingredients => ingredients.filter(element => element.id !== ingredient.id));
    }

    function addStep(step) {
        setSteps(steps => [...steps, step]);
    }

    function removeStep(step) {
        setSteps(steps => steps.filter(element => element.id !== step.id));
    }

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

    if (!recipe) {
        return null;
    }

    return (
        <div>
            <Input>
                <Label>Name</Label>
                <TextInput value={recipe.name} onChange={e => updateRecipe("name", e.target.value)} />
            </Input>
            <Input>
                <Label>Category</Label>
                <TextInput value={recipe.category} onChange={e => updateRecipe("category", e.target.value)} />
            </Input>
            <Input>
                <Label>Minutes</Label>
                <NumberInput value={recipe.minutes} onChange={e => updateRecipe("minutes", Number(e.target.value))} />
            </Input>
            <Input>
                <Label>Description</Label>
                <Textarea value={recipe.description} onChange={e => updateRecipe("description", e.target.value)} /> {/* MAX 200 characters */}
            </Input>
            <button onClick={submit}>Submit</button>
        </div>
    );
}
