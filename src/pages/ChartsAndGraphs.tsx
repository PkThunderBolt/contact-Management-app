import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import redMarkerIcon from '../Images/marker.png'; // Replace with the path to your red marker icon

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartsAndGraphs: React.FC = () => {
  const [lineChartData, setLineChartData] = useState<any>(null);
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [showGraph, setShowGraph] = useState(true);
  const [graphHeight, setGraphHeight] = useState('350px'); // Default height for the graph container

  useEffect(() => {
    // Fetch historical data for the line chart
    axios
      .get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then((response) => {
        const { cases, deaths, recovered } = response.data;
        setLineChartData({
          labels: Object.keys(cases),
          datasets: [
            {
              label: 'Cases',
              data: Object.values(cases),
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
            {
              label: 'Deaths',
              data: Object.values(deaths),
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: false,
            },
            {
              label: 'Recovered',
              data: Object.values(recovered),
              borderColor: 'rgba(153, 102, 255, 1)',
              fill: false,
            },
          ],
        });
      });

    // Fetch country-specific data for the map
    axios.get('https://disease.sh/v3/covid-19/countries').then((response) => {
      setCountriesData(response.data);
    });
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            showGraph ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-200'
          }`}
          onClick={() => setShowGraph(true)}
        >
          Chart
        </button>
        <button
          className={`px-4 py-2 rounded ${
            !showGraph ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-200'
          }`}
          onClick={() => setShowGraph(false)}
        >
          Map
        </button>
      </div>
      {showGraph ? (
        lineChartData ? (
          <div className="bg-white border rounded p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">COVID-19 Cases Over Time</h2>
              <div>
                <label htmlFor="height" className="mr-2">Graph Height:</label>
                <input
                  type="range"
                  id="height"
                  min="150"
                  max="350"
                  value={parseInt(graphHeight)}
                  onChange={(e) => setGraphHeight(`${e.target.value}px`)}
                  className="slider"
                />
              </div>
            </div>
            {/* <div className="h-[57vh]"> */}
            <div style={{height:graphHeight}}>
              <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        ) : (
          <p>Loading line chart...</p>
        )
      ) : (
        <MapContainer center={[20, 0]} zoom={3} style={{height: '70vh', width: '100%' }} className="-z-10">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {countriesData.map((country) => (
            <Marker
              key={country.countryInfo._id}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={new L.Icon({
                iconUrl: redMarkerIcon,
                iconSize: [25, 34],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                shadowSize: [41, 41],
                // shadowAnchor: [4, 30],
              })}
            >
              <Popup>
                <div>
                  <strong>{country.country}</strong>
                  <p>Cases: {country.cases}</p>
                  <p>Active: {country.active}</p>
                  <p>Recovered: {country.recovered}</p>
                  <p>Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default ChartsAndGraphs;
