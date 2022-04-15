import { useDispatch } from "react-redux"
import { filterByCreation, getRecipes } from "../../../redux/actions";
import s from './FilterByCreation.module.css';

export default function FilterByCreation() {

    const dispatch = useDispatch();

    function handleOnChange(e) {
        e.target.value === '' ? dispatch(getRecipes()) : dispatch(filterByCreation(e.target.value));
    }

    return (
        <div>
            <select onChange={handleOnChange} className={s.orderSelect}>
                <option value={''}>Filter by creation</option>
                <option value={'api'}>By Api</option>
                <option value={'db'}>By database</option>
            </select>
        </div>
    )
}




// import { Component } from "react";
// import { connect } from "react-redux";
// import { filterByCreation, getRecipes } from './../../../redux/actions'

// export class FilterByCreation extends Component() {
//     constructor(props) {
//         // super(props)

//         this.handleOnChange = this.handleOnChange.bind(this)
//     }

//     handleOnChange(e) {
//     e.target.value === '' ?
//         this.props.getRecipes()
//         : this.props.filterByCreation(e.target.value);
//     }


//     // handleOnChange = (e) => {
//     //     e.target.value === '' ? this.props.getRecipes() : this.props.filterByCreation(e.target.value);
//     // }


//     render() {
//         return (
//             <div>
/* <select onChange={this.handleOnChange}>
    <option value={''}>Filter by creation</option>
    <option value={'api'}>From Api</option>
    <option value={'db'}>Created in Db</option>
</select> */
//             </div>
//         )

//     }
// }

// export default connect(null, { filterByCreation, getRecipes })(FilterByCreation);