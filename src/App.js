import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import './App.css';
// import { MongoClient } from 'mongodb';



//NaQiWqO13o9tEimO

// const Page = styled.button`
//   border: 2px solid red;
//   background-color: red
//   color: white;
//   padding: 15px 32px;
//   text-align: center;
//   text-decoration: none; 
//   display: inline-block; 
//   font-size: 16px; 
//   transition: 0.5s all ease-out; 

// `
const MainContainer = styled.div`
  font-size: 35px;
  text-align: center;

`

const Bottom = styled.div`
  position: absolute;
  bottom: -20px;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  width: 100%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 12px;
`

const Container = styled.div`
  max-width: 700px;
  height: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Temp = styled.div`
  font-size: 6rem;
  text-align: center;
`

const Description = styled.div`

  font-size: 35px;
  text-align: center;
  transform-origin: 12, 12;
  margin-bottom: 250px;
  
`

const Feels = styled.div`
  font-size: 30px;
  text-align: center;
`
const Max = styled.div`
  font-size: 30px;
  text-align: center;
`
const Min = styled.div`
  font-size: 30px;
  text-align: center;
`




function App() {



  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=5003e4f5c469e5138f5bb62467bee9d9`;
  
  const searchLocation = async (event) => {
    if (event.key === 'Enter') {


      // fetch(url).then(
      //   response => response.json()
      // ).then(
      //   data => {
      //     setData(data)
      //     setLocation(data.location)
      //   }
      // )

      // const mongoClient = new MongoClient('mongodb+srv://ahanooman0307:<NaQiWqO13o9tEimO>@cluster1.6wu7iee.mongodb.net/?retryWrites=true&w=majority')
      
      // const data =  await mongoClient
      // .db()
      // .collection('Cluster1')
      // .find()
      // .toArray();

      // console.log('!!!', data)

        axios.get(url).then((response) => { //sends GET response
            setData(response.data);
            console.log("data",response.data);
        })
        .catch((error) => {
          if(error.response){
            setLocation("Please enter a valid location")
            console.log("not valid location")
          }
        });

        setLocation('')
    }
}

  

  return (
    <>
      <div className="app">
        
        <div className="search">
          <input
          value = {location}
          onChange = {event=> setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Search Location"
          
          type='text'/>

</div>
        
        <Container>
       
          <MainContainer>{data.name}</MainContainer>


          <Temp>{data.main ? <h1>{data.main.temp}°F</h1> : null}</Temp> 

          <Description>{data.weather ? <p> {data.weather[0].main}</p>: null}</Description>

        </Container>

        {data.name !== undefined && 

<Bottom>

<Feels> Feels Like: {data.main.feels_like}°F</Feels>

<MainContainer>Humidity: {data.main.humidity}%</MainContainer>

<MainContainer>Wind Speed: {data.wind.speed} MPH</MainContainer>

<Max>Max: {data.main.temp_max}</Max>

<Min>Min: {data.main.temp_min}</Min>

</Bottom>
        
        
        }
   
      </div>
    </>
  );
}

export default App;
