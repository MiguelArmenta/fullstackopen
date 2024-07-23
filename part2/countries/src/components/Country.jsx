import Weather from "./Weather"

const Country = ({country, handleShowChange, button}) => {
    const languages = Object.values(country.languages)
    return(
        <>
        <h2>{country.name.common} </h2>
        {button ?
        <>
            <button value={country.name.common} onClick={handleShowChange}>Show</button> <br />
        </> : null}
        
        {country.show || button === false?
        <>
            Capital {country.capital} <br />
            Area {country.area} <br />

            <h3>Languages:</h3>
            <ul>
                {languages.map(language=><li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt="" />
            <Weather capital={country.capital[0]} />
            </>
            : null}
        </>
    )
}

export default Country