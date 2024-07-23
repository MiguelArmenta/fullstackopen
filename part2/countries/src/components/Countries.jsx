import Country from "./Country"

const Countries = ({ countries, handleShowChange }) => {
  
    if(countries.length > 10){
        return (
        <>
            {'To many matches, specify another filter'}
        </>
        )
    } else if (countries.length > 1) {
        return(
        <>
            {countries.map(country=>
            <Country
                key={country.name.common}
                country={country}
                handleShowChange={(event)=>handleShowChange(event)}
                button={true}
            />)}
        </>
        )
    } else if (countries.length === 1){
        const country = countries[0]
        return(
        <Country
            key={country.name.common}
            country={country}
            handleShowChange={(event)=>handleShowChange(event)}
            button={false}
        />
        )
    }
    return(
        <>
        {'No finded'}
        </>
    )
}

export default Countries