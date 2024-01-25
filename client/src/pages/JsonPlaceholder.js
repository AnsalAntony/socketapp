import React, { useState, useEffect } from 'react';
import fetchData from '../services/ApiService';
import CommonGrid from '../components/CommonGrid';
import CommonCard from '../components/CommonCard';
import { Grid } from "@mui/material";


const JsonPlaceholder = () => {

  const [apiData, setApiData] = useState([]);

  const getDta =  () =>{
    fetchData()
  .then(data => {
    console.log("json response: 123***", data);
   setApiData(data);
  })
  .catch(error => {
    // Handle errors here
    console.error('Error:', error);
  });
  }

  useEffect(() => {
    // Fetch data from JSONPlaceholder API
    getDta()
  }, []);

  return (
    <CommonGrid
    gridStyle={{height:""}}>
     {apiData?.map((item, index) => (
      <Grid key={index} item lg={3}>
        <CommonCard
          key={index}
          titleText={item?.title || ""}
          descriptionText={item?.body || ""}
        />
      </Grid>
    ))}
  </CommonGrid>
  );
};

export default JsonPlaceholder;
