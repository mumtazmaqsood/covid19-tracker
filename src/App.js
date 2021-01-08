import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";

//components
import { InfoBox } from './InfoBox';
import { TableData } from './TableData';
import { sortData } from './util';
import { LineGraph1 } from './LineGraph1';

import { prettyPrintStat } from './util';
import Map from './Map';


function App() {


  //here is the state in dropdown 
  const [country, setCountry] = useState("worldwide");
  //here is state of individual country
  const [countryInfo, setCountryInfo] = useState({});

  const [countries, setCountries] = useState([]);

  const [tableData, setTableData] = useState([]);

  const [casesType, setCaesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([])


  //first time it is not loading worldwide data here is the solution

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);



  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          //destructuring the data , we need only country name and it code Pakistan & pk
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          console.log("map countries data", data); //this data is also passing to map
          setCountries(countries);
        });

    }
    getCountriesData();
  }, [])


  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    //console.log("COUNTRY CODE", country)
    //if in dropdown worldwide is selected it fetch all countries data 
    //else according to given country code
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);  //all data from the country response 
        console.log("COUNTRY CODE", country)
        setCountryInfo(data);
        console.log("DATA", data)
        //----------------this code is handling dropmenu if 2nd time we need to select
        //worldwide , it has not lat & lng parameters then it shows error 
        if (countryCode === "worldwide") {
          setMapCenter({ lat: 34.80746, lng: -40.4796 });
          setMapZoom(2);

        }
        //-----------------
        else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(3);
        }
        //setCountry("")
      });

  };



  return (
    <div className="app">
      {/*right panel of the app  */}
      <Card className="app_left">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <TableData countries={tableData} />
          <h3>World Wide new Cases {casesType} </h3>
          {/* <LineGraph casesType={casesType} /> */}
          <LineGraph1 casesType={casesType} />
        </CardContent>

      </Card>



      <div className="app_right">
        <div className="app_header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">World Wide</MenuItem>
              {countries.map((country, ind) => (
                <MenuItem key={ind} value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* code for infobox compnent */}
        <div className="app_stats">
          <InfoBox
            onClick={e => setCaesType("cases") }
            title="Cornovirus cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            onClick = { e =>setCaesType("recovered")}
            title="Recoverd"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
          onClick={ e =>setCaesType("deaths")} 
          title="Total Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>
        {/* --------End Info Component*/}


        <Map 
        casesType={casesType} 
        countries={mapCountries} 
        center={mapCenter} 
        zoom={mapZoom} 
        />

      </div>



    </div>
  );
}

export default App;