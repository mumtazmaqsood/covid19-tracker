
import './App.css';
import NavBar from './components/NavBar';
import InfoPanel from './components/InfoPanel';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";

//components
import { InfoBox } from './InfoBox';
import { TableData } from './TableData';
import { sortData } from './util';
import { LineGraph } from './LineGraph';

import Map from './Map';


function App() {

  const [countries, setCountries] = useState([]);

  //here is the state in dropdown 
  const [country, setCountry] = useState("worldwide");

  //here is state of individual country
  const [countryInfo, setCountryInfo] = useState({});

  const [tableData, setTableData] = useState([]);

  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const[mapCountries, setMapCountries] = useState([])


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
          setCountries(countries);
        });

    }
    getCountriesData();
  }, [])


  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

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
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });

  };

  console.log("countryinfor", countryInfo);

  return (
    <div className="app">
      <div className="app_left">
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
          <InfoBox title="Cornovirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recoverd" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Total Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/* --------End Info Component*/}


        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>

      {/*right panel of the app  */}
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <TableData countries={tableData} />
          <h3>World Wide new Cases {casesType} </h3>
          <LineGraph casesType={casesType} />
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
