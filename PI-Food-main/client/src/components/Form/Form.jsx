import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewRecipe } from "../../redux/actions";
import { validateForm } from "./validateForm";
import NavBar from "../NavBar";
import s from './Form.module.css';
import { useHistory } from "react-router-dom";

export default function Form() {
    const [input, setInput] = useState({
        title: '',
        image: 'https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png',
        summary: '',
        spoonacularScore: 50,
        healthScore: 50,
        diets: [],
        steps: '',
    });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();
    const { typesOfDiets } = useSelector(state => state);

    const [stepList, setStepList] = useState([]);
    const [stepCounter, setStepCounter] = useState(1);
    const [disabledButton, setDisabledButton] = useState(true);

    useEffect(() => {
        if (input.title &&
            input.summary &&
            input.spoonacularScore &&
            input.healthScore &&
            input.diets.length &&
            stepList.length &&
            !Object.keys(errors).length) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [errors]);

    function validateForm(state) {
        const errors = {};
        if (!state.title) {
            errors.title = "Title is required";
            // } else if (!/^[\d]$/.test(state.title)) {
            //   errors.title = "Title must be a string";
        } else if (!/^[a-zñ|A-ZÑ\s]{6,}$/.test(state.title)) {
            errors.title = "Title must be a string of at least 6 characters long";
        }
        // if (!state.image) {
        //   errors.image = "Image is required";
        // } else if (
        //   !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(state.image)
        // ) {
        //   errors.image = "Image must be a valid URL";
        // }
        if (!state.summary) {
            errors.summary = "Summary is required";
        } else if (!/^[a-zñ|A-ZÑ\s\d]{10,}$/.test(state.summary)) {
            errors.summary = "Summary must be at least 10 characters long";
        }
        if (!state.spoonacularScore) {
            errors.spoonacularScore = "Spoonacular score is required";
        } else if (!/[^0-100]/.test(state.spoonacularScore)) {
            errors.spoonacularScore = "Spoonacular score must be between 0 and 100";
        }
        if (!state.healthScore) {
            errors.healthScore = "Health score is required";
        } else if (!/[^0-100]/.test(state.healthScore)) {
            errors.healthScore = "Health score must be between 0 and 100";
        }
        if (!state.diets) {
            errors.diets = "Diets is required";
        } else if (!/\w/.test(state.diets)) {
            errors.diets = "Diets must be at least one";
        }
        if (!stepList.length) {
            errors.steps = "Steps must be at least one";
        }
        return errors;
    }

    function handleOnChange(e) {
        e.preventDefault();
        setInput((prevState) => {
            //creo mi nuevo estado.
            const newState = {
                ...prevState,
                [e.target.name]: e.target.value,
            };
            //valido los errores de mi estado.
            setErrors(validateForm(newState, stepList));

            //devuelvo mi nuevo estado.
            return newState
        }
        );
    }

    function handleOnCheck(e) {
        e.preventDefault();
        if (e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value],
            });
        } else {
            setInput({
                ...input,
                diets: input.diets.filter(diet => diet !== e.target.value),
            });
        }
    }

    function addStep(e) {
        e.preventDefault();
        const allSteps = stepList.map(el => el.step);
        const findStep = allSteps.find(el => el === input.steps);
        if (findStep?.length) {
            alert('This step already exists.');
        }
        else if (input.steps && !findStep?.length) {
            setStepList([...stepList, { number: stepCounter, step: input.steps }]);
            setStepCounter(stepCounter + 1);
            setInput({
                ...input,
                steps: '',
            });

        }

    }

    function deleteStep(e, numberStepToDelete) {
        e.preventDefault();
        let filteredSteps = stepList.filter(el => el.number !== numberStepToDelete);
        //tengo que corregir el numero de los steps que quedan.

        for (let i = numberStepToDelete - 1; i < filteredSteps.length; i++) {
            // filteredSteps[i].number = i + 1;
            filteredSteps[i].number--;
        }


        // filteredSteps = filteredSteps.map(el => {
        //     if (numberStepToDelete < el.number) {
        //         return {
        //             number: el.number - 1,
        //             step: el.step,
        //         }
        //     }
        // })
        setStepCounter(stepCounter - 1);
        setStepList(filteredSteps);
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        setErrors(validateForm(input, stepList));
        // console.log('errors', errors);
        // console.log('input', input);
        if (
            input.title &&
            input.summary &&
            input.spoonacularScore &&
            input.healthScore &&
            input.diets.length &&
            stepList.length &&
            !Object.keys(errors).length
        ) {
            // if (input.image === '') {
            //     console.log('entra')
            //     setInput((prevState) => {
            //         const imagenPorDefault = {
            //             ...prevState,
            //             image: 'https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png',
            //         }
            //         return imagenPorDefault
            //         //si esto no funciona le seteo una imagen por default
            //         //cuando creo el state le pongo una imagen por default
            //     })
            // input.image = 'https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png';
            // }
            // if (typeof input.spoonacularScore === 'string') {
            //     setInput({
            //         ...input,
            //         spoonacularScore: parseInt(input.spoonacularScore),
            //     })
            // }
            // if (typeof input.healthScore === 'string') {
            //     setInput({
            //         ...input,
            //         healthScore: parseInt(input.healthScore),
            //     })
            // }
            // typeof input.spoonacularScore === 'string' ? input.spoonacularScore = parseInt(input.spoonacularScore) : null;
            // typeof input.healthScore === 'string' ? input.healthScore = parseInt(input.healthScore) : null;
            input.steps = stepList;
            dispatch(postNewRecipe(input));
            alert("Recipe added succesfully!");
            history.push("/home");
        } else {
            alert("Please, fill all the fields correctly!");
        }
        setInput({
            title: '',
            image: 'https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png',
            summary: '',
            spoonacularScore: 50,
            healthScore: 50,
            diets: [],
            steps: '',
        });
    }


    return (
        <div>
            <NavBar />
            <br />
            <form onSubmit={handleOnSubmit}>

                <label htmlFor="title">Title </label>
                <input className={errors.title && s.inputDanger} type="text" onChange={handleOnChange} name="title" placeholder="Enter a title.." defaultValue={input.title} />
                {errors.title && /*[<br />,*/ <span className={s.danger}>{errors.title}</span>/*]*/}
                <br />
                <label htmlFor="image">Image url (optional)</label>
                <input className={errors.image && s.inputDanger} type='url' onChange={handleOnChange} name="image" placeholder="Enter an image url.." defaultValue={input.image} />
                <br />
                <label htmlFor="summary">Summary </label>
                <input className={errors.summary && s.inputDanger} type="text" onChange={handleOnChange} name="summary" placeholder="Enter a summary.." defaultValue={input.summary} />
                {errors.summary && /*[<br />,*/ <span className={s.danger}>{errors.summary}</span>/*]*/}
                <br />
                <label htmlFor="spoonacularScore">Spoonacular Score </label>
                <input className={errors.spoonacularScore && s.inputDanger} type='range' min={'0'} max={'100'} onChange={handleOnChange} name="spoonacularScore" placeholder="Enter a score.." defaultValue={input.spoonacularScore} />
                {errors.spoonacularScore && /*[<br />,*/ <span className={s.danger}>{errors.spoonacularScore}</span>/*]*/}
                <br />
                <label htmlFor="healthScore">Health Score </label>
                <input className={errors.healthScore && s.inputDanger} type='range' min={'0'} max={'100'} onChange={handleOnChange} name="healthScore" placeholder="Enter a health score.." defaultValue={input.healthScore} />
                {errors.healthScore && /*[<br />,*/ <span className={s.danger}>{errors.healthScore}</span>/*]*/}
                <br />
                <label htmlFor="diets">Diets </label>
                {errors.diets && /*[<br />,*/ <span className={s.danger}>{errors.diets}</span>/*]*/}
                {/* <input type="text" onChange={handleOnChange} name="diets" placeholder="Enter a type of diet.." defaultValue={newRecipe.diets} /> */}
                {typesOfDiets.map(type => (
                    <div key={type.name}>
                        <input className={errors.diets && s.inputDanger} type="checkbox" onChange={handleOnCheck} name="diets" defaultValue={type.name} />
                        <label htmlFor={type.name}>{type.name.toUpperCase()}</label>
                    </div>

                ))}
                <br />
                <label htmlFor="steps">Steps </label>
                <div>
                    <p>Create your instructions</p>
                    <input /*className={errors.steps && s.inputDanger}*/ type="text" onChange={handleOnChange} name="steps" placeholder="Enter steps.." defaultValue={input.steps} />
                    {errors.steps && /*[<br />,*/ <span className={s.danger}>{errors.steps}</span>/*]*/}
                    <button onClick={addStep}>Add</button>
                </div>
                <div>
                    {stepList.map((el) => (
                        <div key={el.number}>
                            <p>{el.number}. {el.step}</p>
                            <button onClick={(e) => deleteStep(e, el.number)}>x</button>
                        </div>
                    ))}
                </div>

                <button type="submit" disabled={disabledButton}> Create </button>
            </form>
        </div>
    )
}