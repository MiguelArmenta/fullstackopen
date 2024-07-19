const PersonForm = (props) => {
    return <div>
        <form onSubmit={props.handleSubmit}>
        <div>
          name: <input value={props.name} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input value={props.number} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
}

export default PersonForm