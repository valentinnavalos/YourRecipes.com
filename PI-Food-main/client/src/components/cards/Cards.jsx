import Card from '../card/Card';
import s from './Cards.module.css';

export default function Cards({ currentRecipes }) {
    return (
        <div>
            {currentRecipes.length ? (
                <div className={s.cards}>
                    {currentRecipes.map(recipe => (
                        <Card key={recipe.id} {...recipe} />
                    ))}
                </div>
            ) : (
                <span className={s.notFound}>Recipes not found.</span>
            )}
        </div>
    )
}
