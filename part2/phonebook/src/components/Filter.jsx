const Filter = (props) => {
    return <div>
        Filter shown with
        <input value={props.value} onChange={props.handleFilterChange} />
    </div>
}

export default Filter