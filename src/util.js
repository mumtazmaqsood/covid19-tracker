import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';



const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 300,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 300,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 400,
    },
};


// this function formatting top total box  and imported in app.js
export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";



export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
}


/*data > is comming from Map.js , countries --> is props comming form Apps.js , 
passed <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} /> in Apps.js
and this mapCountries is useState in App.js  const [mapCountries, setMapCountries] = useState([])
setMapCountries updated when all countries data fetched
so in mapCountries -> this variable has all countreis data and here is all countries data used

*/
export const showDataOnMap = (data, casesType = "cases") => data.map((country) => (
    <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        fillOpacity={0.4}
        radius={  //this is calculating circle its not a fixed formula
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
    >
        <Popup>
            <div className="info-container">
                {/* this div is showing flag of the country */}
                <div className="info-flag"
                    style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                <div className="info-name">{country.country}</div>  {/* name of the country */}
                <div className="info-confirmed">Cases:{numeral(country.cases).format("0,0")}</div>      {/* Total cases */}
                <div className="info-recovered">Recovered:{numeral(country.recovered).format("0,0")}</div>  {/* Total recovered */}
                <div className="info-deaths">Deaths:{numeral(country.deaths).format("0,0")}</div>     {/* Total deaths */}
                {/* numeral format number */}

            </div>


        </Popup>
    </Circle>
));