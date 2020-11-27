import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import AlbumPage from "./components/AlbumPage";
import ArtistPage from "./components/ArtistPage";
import NavBar from "./components/NavBar";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router className="App">
        <Route path="/" exact render={(props) => <Home {...props} />} />
        <Route
          path="/album/:albumId"
          exact
          render={(props) => <AlbumPage {...props} />}
        />
        <Route
          path="/artist/:artistName"
          exact
          render={(props) => <ArtistPage {...props} />}
        />
      </Router>
    );
  }
}
export default App;
