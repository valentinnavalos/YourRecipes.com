export default function OrderAZ() {

    function handleOnChange (e){
        e.preventDefault();
        console.log(e)
    }

    return (
        <div>
            <select name="select" onChange={handleOnChange}>
                <option value="">Filter by Name</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
        </div>
    )
}