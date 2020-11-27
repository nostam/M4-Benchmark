import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Home.css";
import NavBar from "./NavBar";
import Player from "./Player";
import AlbumCovers from "./AlbumCovers";
export default class Home extends Component {
  state = { artistName: "Kalafina" };

  url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
  handleNavTab = (e) => {
    this.setState({ artistName: e.target.innerText });
    console.log("clicked", this.state);
  };
  fetchDeezer = () => {
    Promise.all([
      fetch(this.url + this.state.artistName, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "74a8e76fbamshe2a8991c5162cf0p18ff5ajsn4ac24c69ec4a",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((responseObject) => {
          console.log(responseObject);
          this.setState({ artistAlbum: responseObject.data }, () =>
            console.log(this.state.artistAlbum)
          );
        }),
    ])
      .then(() => this.setState({ loading: false }))
      .catch((err) => {
        this.setState({ error: true });
        console.log("An error has occurred:", err);
      });
  };
  componentDidMount = () => {
    this.fetchDeezer();
  };
  componentDidUpdate = (prevProps, PrevState) => {
    if (PrevState.artistName !== this.state.artistName) {
      this.fetchDeezer();
    }
  };
  render() {
    return (
      <>
        {console.log("render", this.state)}
        <NavBar />
        <Container>
          <Row className="my-4 mx-5 text-white">
            <Col
              md={4}
              value="Ringo Shinna"
              label="Ringo Shinna"
              onClick={(e) => this.handleNavTab(e)}
            >
              <span>Ringo Shinna</span>
            </Col>
            <Col md={4} onClick={(e) => this.handleNavTab(e)}>
              Kōji Tamaki
            </Col>
            <Col md={4} onClick={(e) => this.handleNavTab(e)}>
              King Gnu
            </Col>
          </Row>
          <Row>
            <AlbumCovers
              query={this.state.artistName}
              data={this.state.artistAlbum}
            />
          </Row>
        </Container>
        <Player />
      </>
    );
  }
}
