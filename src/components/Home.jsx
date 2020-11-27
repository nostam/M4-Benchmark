import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Home.css";
import NavBar from "./NavBar";
import Player from "./Player";
import AlbumCovers from "./AlbumCovers";
export default class Home extends Component {
  state = { err: false, errMsg: null, artistName: "Kalafina" };

  url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
  handleNavTab = (e) => {
    this.setState({ artistName: e.target.innerText });
  };
  searchDeezer = () => {
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
          this.setState({ artistAlbum: responseObject.data }, () =>
            console.log(this.state.artistAlbum)
          );
        }),
    ])
      .then(() => this.setState({ loading: false }))
      .catch((err) => {
        this.setState({ err: true });
        console.log("An error has occurred:", err);
      });
  };
  componentDidMount = () => {
    this.searchDeezer();
  };
  componentDidUpdate = (prevProps, PrevState) => {
    if (PrevState.artistName !== this.state.artistName) {
      this.searchDeezer();
    }
  };
  render() {
    return (
      <>
        {/* {console.log("render", this.state)} */}
        <NavBar />
        <Container>
          <Row className="my-4 mx-5 text-white">
            <Col
              md={4}
              value="Ringo Shinna"
              label="Ringo Shinna"
              onClick={(e) => this.handleNavTab(e)}
            >
              Ringo Shinna
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
