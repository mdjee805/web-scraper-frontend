import React from "react";
import { useForm } from "react-hook-form";
import './App.css';

function App() {
  const [searchTerm, setSearch] = React.useState(null);
  const [searchUrl, setUrl] = React.useState(null);
  const [searchCount, setCount] = React.useState(null);
  const [searchDate, setDate] = React.useState(null);


  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    console.log(data, e);
    await fetch(`http://localhost:3001/api?url=${encodeURIComponent(data.url)}&search=${encodeURIComponent(data.search)}`)
      .then((res) => res.json())
      .then((searchData) => {
        setCount(searchData.count); 
        setSearch(searchData.search);
        setUrl(searchData.url);
        setDate(searchData.date)
    });
  }
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="App">
      <div className="title">
        <h2>Web Scrapper App</h2>
        <h3>Author: Michael Jee</h3>
        <h5>Created: January 28th 2023</h5>
      </div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
          <label>Search term: </label>
          <input {...register("search")} />
          <label>URL of web page to search: </label>
          <input {...register("url")} />
          <button type="submit">Submit</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Date/Time Searched</th>
              <th>Url Searched</th>
              <th>Term Searched</th>
              <th>Times found (caps sensitive, all body content)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{searchDate === null ? "" : searchDate}</td>
              <td>{searchTerm === null ? "No Search Term Entered" : searchTerm}</td>
              <td>{searchUrl === null ? "No Url Entered" : searchUrl}</td>
              <td>{searchCount === null || searchCount === -1 ? "" : searchCount}</td>
            </tr>
          </tbody>
        </table>
        <p>{searchCount === -1 ? "Error processing request" : ""}</p>
    </div>
  );
}

export default App;
