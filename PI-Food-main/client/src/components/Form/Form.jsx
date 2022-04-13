import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypesOfDiets, postNewRecipe } from "../../redux/actions";
import defaultImg from './../../images/noImageAvailable.png';
import s from './Form.module.css';
import { Link, useHistory } from "react-router-dom";

export default function Form() {
    const [input, setInput] = useState({
        title: '',
        image: '',
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
    }, [errors, input, stepList]);

    useEffect(() => {
        if (!typesOfDiets.length) {
            dispatch(getTypesOfDiets());
        }
    }, [dispatch, typesOfDiets.length]);

    function validateForm(state) {
        const errors = {};
        // title
        if (!state.title) {
            errors.title = "Title is required";
            // } else if (!/^[\d]$/.test(state.title)) {
            //   errors.title = "Title must be a string";
        } else if (!/^[a-zñá-ú\s]{6,}$/i.test(state.title)) {
            // /^[a-zñ|A-ZÑ\s]{6,}$/
            errors.title = "Title must be a string of at least 6 characters long";
        }
        // image
        if (state.image && !/(http(s?):)([/|.|\w|\s|%-])*\.(?:jpg|gif|png)/i.test(state.image)) {
            errors.image = "It must be a valid image URL";
        }
        // summary
        if (!state.summary) {
            errors.summary = "Summary is required";
        } else if (!/^[a-zñá-ú\s\d.,#!$%&;:{}=\-_`~()”“"…¿?¡']{10,}$/i.test(state.summary)) {
            // /^[a-zñ|A-ZÑ\s\d]{10,}$/
            errors.summary = "Summary must be at least 10 characters long";
        }
        // spoonacularScore
        if (!state.spoonacularScore) {
            errors.spoonacularScore = "Spoonacular score is required";
        } else if (!/[^0-100]/.test(state.spoonacularScore)) {
            errors.spoonacularScore = "Spoonacular score must be between 0 and 100";
        }
        // healthScore
        if (!state.healthScore) {
            errors.healthScore = "Health score is required";
        } else if (!/[^0-100]/.test(state.healthScore)) {
            errors.healthScore = "Health score must be between 0 and 100";
        }
        // diets
        if (!state.diets.length) {
            errors.diets = "At leasth one diet is required";
        }
        // steps
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
            setErrors({
                ...errors,
                steps: '',
            })
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
            // !Object.keys(errors).length
            !errors.title &&
            !errors.summary &&
            !errors.spoonacularScore &&
            !errors.healthScore &&
            !errors.diets &&
            !errors.steps
        ) {
            if (!input.image) {
                input.image = defaultImg;
            }
            input.steps = stepList;
            console.log('input', input);
            dispatch(postNewRecipe(input));
            alert("Recipe created succesfully!");
            history.push("/home");
        } else {
            alert("Please complete all fields correctly!");
        }
        setInput({
            title: '',
            image: '',
            summary: '',
            spoonacularScore: 50,
            healthScore: 50,
            diets: [],
            steps: '',
        });
    }


    return (
        <div className={s.mainContainer}>
            <div className={s.formHeader}>
                <h2 className={s.headerTitle}>Add a new recipe</h2>
                <Link to={"/home"} className={s.linkButton}>
                    <button className={s.button}>Home</button>
                </Link>
            </div>
            <form onSubmit={handleOnSubmit} className={s.form}>
                <div className={s.firstContainer}>

                    <div className={s.simpleInputs}>
                        <label className={s.labelText} htmlFor="title">Title </label>
                        <div>
                            <input
                                className={s.inputForm}
                                type="text"
                                onChange={handleOnChange}
                                name="title"
                                placeholder="Enter a title.."
                                defaultValue={input.title} />
                        </div>
                        {errors.title && <span className={s.dangerText}>{errors.title}</span>}
                    </div>
                    <div className={s.simpleInputs}>
                        <label className={s.labelText} htmlFor="image">Image url (optional)</label>
                        <div className={s.inputDiv}>
                            <input
                                className={s.inputForm}
                                type='url'
                                onChange={handleOnChange}
                                name="image"
                                placeholder="Enter an image url.."
                                value={input.image}
                            />
                        </div>
                        {errors.image && <span className={s.dangerText}>{errors.image}</span>}
                    </div>
                    <div className={s.simpleInputs}>
                        <label className={s.labelText} htmlFor="summary">Summary </label>
                        <div className={s.inputDiv}>
                            <input
                                className={s.inputForm}
                                type="text"
                                onChange={handleOnChange}
                                name="summary"
                                placeholder="Enter a summary.."
                                defaultValue={input.summary} />
                        </div>
                        {errors.summary && <span className={s.dangerText}>{errors.summary}</span>}
                    </div>
                    <div className={s.simpleInputs}>
                        <label className={s.labelText} htmlFor="spoonacularScore">Spoonacular Score </label>
                        <div className={s.inputDiv}>
                            <input
                                className={s.inputForm}
                                type='range'
                                min={'0'}
                                max={'100'}
                                onChange={handleOnChange}
                                name="spoonacularScore"
                                placeholder="Enter a score.."
                                defaultValue={input.spoonacularScore} />
                        </div>
                        {errors.spoonacularScore && <span className={s.dangerText}>{errors.spoonacularScore}</span>}
                    </div>
                    <div className={s.simpleInputs}>
                        <label className={s.labelText} htmlFor="healthScore">Health Score </label>
                        <div className={s.inputDiv}>
                            <input
                                className={s.inputForm}
                                type='range'
                                min={'0'}
                                max={'100'}
                                onChange={handleOnChange}
                                name="healthScore"
                                placeholder="Enter a health score.."
                                defaultValue={input.healthScore} />
                        </div>
                        {errors.healthScore && <span className={s.dangerText}>{errors.healthScore}</span>}
                    </div>
                </div>

                {/* diets */}
                <div className={s.secondContainer}>
                    <div>
                        <label className={s.labelText} htmlFor="diets">Diets </label>
                        {errors.diets && <span className={s.dangerText}>{errors.diets}</span>}
                        <div className={s.checkboxGroup}>
                            {typesOfDiets.map(type => (
                                <div
                                    className={s.checkboxElement}
                                    key={type.name}>
                                    <label className={s.checkboxLabel} htmlFor={type.name}>
                                        <input
                                            className={s.checkboxInput}
                                            type="checkbox"
                                            onChange={handleOnCheck}
                                            name="diets"
                                            // defaultValue={type.name} 
                                            value={type.name}/>
                                        {type.name.toUpperCase()}</label>
                                </div>

                            ))}
                        </div>
                    </div>

                </div>

                {/* steps */}
                <div className={s.secondContainer}>

                    <label className={s.labelSteps} htmlFor="steps">Steps </label>
                    <div className={s.allStepParts}>
                        <div className={s.stepsCreate}>
                            <p>Create your instructions</p>
                            <div className={s.addStepsGroup}>
                                <input
                                    /*className={errors.steps && s.inputDanger}*/
                                    type="text"
                                    onChange={handleOnChange}
                                    name="steps"
                                    placeholder="Enter steps.."
                                    className={s.inputForm}
                                    value={input.steps} />
                                {/* {errors.steps && <span className={s.dangerText}>{errors.steps}</span>} */}
                                <button
                                    onClick={addStep}
                                    className={s.stepButton}>Add</button>
                            </div>
                        </div>
                        <div className={s.stepList}>
                            {stepList.map((el) => (
                                <div key={el.number} className={s.eachStep}>
                                    <p>{el.number}. {el.step}</p>
                                    <button
                                        className={s.deleteBtn}
                                        onClick={(e) => deleteStep(e, el.number)}>
                                        x</button>
                                </div>
                            ))}
                            {errors.steps && <span className={s.dangerText}>{errors.steps}</span>}
                        </div>
                    </div>
                </div>
                <div className={s.secondContainer}>

                    <div className={s.submitButton}>
                        <button
                            type="submit"
                            disabled={disabledButton}
                            className={s.button}
                            >
                            Create </button>
                    </div>
                </div>
            </form>
        </div>
    )
}