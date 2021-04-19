import { useState } from 'react';
import Checkbox from './Checkbox';
import * as Styles from './recipe.styles';

export default function RecipeStep({ step, index }) {
    const [checked, setChecked] = useState(false);

    function toggleChecked() {
        setChecked(checked => !checked);
    }

    return (
        <Styles.Step checked={checked}>
            <Checkbox checked={checked} toggleChecked={toggleChecked} />
            <Styles.StepNumber>{index}</Styles.StepNumber>
            <Styles.StepText>{step.value}</Styles.StepText>
        </Styles.Step>
    );
}
