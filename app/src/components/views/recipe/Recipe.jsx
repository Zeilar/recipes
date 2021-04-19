import { useState, useEffect, useContext } from 'react';
import useFetch from '../../../hooks/useFetch';
import Loader from '../../Loader';
import { Col, Row } from '../../styled-components';
import { mdiClockTimeFourOutline, mdiFormatListCheckbox, mdiFoodVariant } from '@mdi/js';
import * as Styles from './recipe.styles';
import Step from './RecipeStep';
import EditRecipe from './EditRecipe';
import { UserContext } from '../../contexts/UserContext';

function pluralize(string, number) {
    return number > 1 ? `${string}s` : string;
}

export default function Recipe({ match }) {
    const { data: recipe, loading } = useFetch(`http://localhost:3000/api/recipes/${match.params.id}`);

    const [editing, setEditing] = useState(false);
    const { isLoggedIn } = useContext(UserContext);

    function closeEditMode() {
        setEditing(false);
    }

    function openEditMode() {
        setEditing(true);
    }

    if (editing) {
        return <EditRecipe data={recipe} closeEditMode={closeEditMode} />
    }

    return (
        <Styles.Wrapper as={Col}>
            {loading && <Loader message="Loading your recipe" />}
            {!loading && recipe && (
                <Styles.Body>
                    <button onClick={openEditMode}>Edit</button>
                    <Styles.Header>
                        <Styles.HeaderMeta>
                            <Styles.Title>{recipe.name}</Styles.Title>
                            <Styles.Author to={`/user/${recipe.user.id}`}>A recipe by {recipe.user.username}</Styles.Author>
                            <Styles.Description>{recipe.description}</Styles.Description>
                            <Row as={Styles.Stats}>
                                <Styles.Stat>
                                    <Styles.StatIcon path={mdiClockTimeFourOutline} />
                                    <Styles.StatText>{recipe.minutes} {pluralize("minute", recipe.minutes)}</Styles.StatText>
                                </Styles.Stat>
                                <Styles.Stat>
                                    <Styles.StatIcon path={mdiFoodVariant} />
                                    <Styles.StatText>{recipe.ingredients.length} {pluralize("ingredient", recipe.ingredients.length)}</Styles.StatText>
                                </Styles.Stat>
                                <Styles.Stat>
                                    <Styles.StatIcon path={mdiFormatListCheckbox} />
                                    <Styles.StatText>{recipe.steps.length} {pluralize("step", recipe.steps.length)}</Styles.StatText>
                                </Styles.Stat>
                            </Row>
                        </Styles.HeaderMeta>
                        <Styles.Banner src={`/assets/recipe-images/${recipe.image}.jpg`} />
                    </Styles.Header>
                    <Styles.Instructions>
                        <Styles.Instruction>
                            <Styles.InstructionHeader>Ingredients</Styles.InstructionHeader>
                            <Styles.InstructionContent>
                                {recipe.ingredients.map(ingredient => (
                                    <Styles.Ingredient key={ingredient.id}>
                                        <Styles.IngredientAmount>
                                            {ingredient.amount} {ingredient.unit}
                                        </Styles.IngredientAmount>
                                        <Styles.IngredientText>{ingredient.name}</Styles.IngredientText>
                                    </Styles.Ingredient>
                                ))}
                            </Styles.InstructionContent>
                        </Styles.Instruction>
                        <Styles.Instruction>
                            <Styles.InstructionHeader>Steps</Styles.InstructionHeader>
                            <Styles.InstructionContent>
                                {recipe.steps.map((step, i) => <Step step={step} index={i + 1} key={step.id} />)}
                            </Styles.InstructionContent>
                        </Styles.Instruction>
                    </Styles.Instructions>
                </Styles.Body>
            )}
        </Styles.Wrapper>
    );
}
