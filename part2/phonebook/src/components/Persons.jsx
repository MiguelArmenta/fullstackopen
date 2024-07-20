const Persons = ({ persons, handlePersonDelete }) => {
    
    return <div>
        {persons.map(person => <div key={person.id}> <label> {person.name} {person.number} </label>
        <button value={person.id} onClick={handlePersonDelete}>Delete</button> <br/>
        </div>
        )}

    </div>
}

export default Persons