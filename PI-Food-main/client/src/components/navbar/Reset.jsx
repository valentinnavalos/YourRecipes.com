import { Component } from 'react';
import { connect } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { getRecipes } from '../../redux/actions';

// export default function Reset() {
//     const dispatch = useDispatch();

//     function handleClick(e) {
//         e.preventDefault();
//         dispatch(getRecipes())
//     }
//     return (
//         <div>
//             <button onClick={handleClick}>Reset Home</button>
//         </div>
//     )
// }

class Reset extends Component(){
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        this.props.getRecipes();
    }

    // handleClick = (e) => {
    //     e.preventDefault();
    //     this.props.getRecipes();
    // }
    
    render(){
        return (
            <div>
                <button onClick={this.handleClick}>Reset Home</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

connect(mapStateToProps, {getRecipes})(Reset)