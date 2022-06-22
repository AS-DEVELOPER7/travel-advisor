import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlaceData } from "./api";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [bounds, setBounds] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lng: longitude, lat: latitude });
      }
    );
  }, []);
  useEffect(() => {
    const filteredplaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredplaces);
  }, [rating]);
  useEffect(() => {
    setIsLoading(true);
    getPlaceData(type, bounds.sw, bounds.ne).then((data) => {
      setPlaces(data);
      setFilteredPlaces([]);
      setIsLoading(false);
    });
  }, [coordinates, bounds, type]);
  return (
    <>
      <CssBaseline>
        <Header />
        <Grid container spacing={0} style={{ width: "100%", height: "100%" }}>
          <Grid item xs={12} md={4}>
            <List
              places={filteredPlaces.length ? filteredPlaces : places}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces : places}
            />
          </Grid>
        </Grid>
      </CssBaseline>
    </>
  );
};

export default App;
