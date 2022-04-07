export default function OrderScore() {

    function handleOnChange (e){
        e.preventDefault();
    }

    return (
        <div>
            <select onChange={handleOnChange}>
                <option value="">Filter by Score</option>
                <option value="high">Highest Score</option>
                <option value="low">Lowest Score</option>
            </select>
        </div>
    )
}