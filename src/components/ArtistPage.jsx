import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  Jumbotron,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaPlay,
  FaHeart,
  FaEllipsisH,
  FaEllipsisV,
  FaRegHeart,
  FaPlayCircle,
  FaPauseCircle,
  FaSpotify,
} from "react-icons/fa";
import "../styles/ArtistPage.css";
import NavBar from "./NavBar";
import Player from "./Player";
import AlbumCovers from "./AlbumCovers";
export default class ArtistPage extends Component {
  state = {
    loading: true,
    alertMsg: "",
    err: false,
    artist: {},
  };

  url = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
  searchDeezer = (artistName) => {
    Promise.all([
      fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artistName, {
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
  searchDeezerArtist = (artistId) => {
    Promise.all([
      fetch(this.url + artistId, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "74a8e76fbamshe2a8991c5162cf0p18ff5ajsn4ac24c69ec4a",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((responseObject) => {
          this.setState({ artist: responseObject }, () =>
            console.log(this.state.artist)
          );
          this.searchDeezer(this.state.artist.name);
        }),
    ]).catch((err) => {
      this.setState({ err: true });
      this.setState({ loading: false });
      console.log("An error has occurred:", err);
    });
  };
  handleErr = (msg) => {
    this.setState({ err: true, errMsg: msg });
  };
  componentDidMount = () => {
    this.setState({ alertMsg: "Loading Artist Info" });
    let artistId = this.props.match.params.artistId;
    artistId
      ? this.searchDeezerArtist(artistId)
      : this.handleErr("Invalid Artist Id");
  };
  // componentDidUpdate = (prevProps, PrevState) => {
  //   if (PrevState.artistName !== this.state.artistName) {
  //     this.searchDeezerAlbum();
  //   }

  render() {
    return (
      <>
        {console.log("render", this.state)}
        <NavBar />
        <Container>
          {this.state.err && (
            <Alert variant="danger" dismissible>
              {this.state.errMsg}
            </Alert>
          )}
          {this.state.loading && (
            <Alert variant="warning" className="my-5 mx-5">
              {this.state.alertMsg}
              <Spinner animation="border" variant="green"></Spinner>
            </Alert>
          )}
          {!this.state.loading && (
            <Row>
              <section className="">
                <div className="">
                  <img
                    src={this.state.artist.picture_medium}
                    className="img-fluid"
                  />
                  <div className="container mt-3 justify-center">
                    <Jumbotron className="jumbotron d-flex justify-content-center flex-column">
                      <h6>
                        {Math.floor(Math.random() * 10000000)} MONTHLY LISTENERS
                      </h6>
                      <h1 className="display-4">{this.state.artist.name}</h1>
                      <div className="d-flex d-md-none  row">
                        <a
                          className="artist-pg-play-btn btn"
                          href="#"
                          role="button"
                        >
                          PLAY
                        </a>
                        <a
                          className="artist-pg-follow-btn btn btn-outline-light btn-lg"
                          href="#"
                          role="button"
                        >
                          FOLLOW
                        </a>
                      </div>
                      <div className="d-none d-md-flex column">
                        <a
                          className="artist-pg-play-btn btn"
                          href="#"
                          role="button"
                        >
                          PLAY
                        </a>
                        <a
                          className="artist-pg-follow-btn btn btn-outline-light btn-lg"
                          href="#"
                          role="button"
                        >
                          FOLLOW
                        </a>
                      </div>
                    </Jumbotron>
                  </div>

                  <div>
                    <ul
                      className="nav nav-tabs justify-content-center"
                      id="myTab"
                      role="tablist"
                    >
                      <li
                        className="nav-item d-none d-md-flex"
                        role="presentation"
                      >
                        <a
                          className="nav-link"
                          id="trending-tab"
                          data-toggle="tab"
                          href="#trending"
                          role="tab"
                          aria-controls="trending"
                          aria-selected="true"
                          data-target="#homepage-headings"
                          data-slide-to="0"
                        >
                          OVERVIEW
                        </a>
                      </li>
                      <li
                        className="nav-item d-none d-md-flex"
                        role="presentation"
                      >
                        <a
                          className="nav-link"
                          id="podcast-tab"
                          data-toggle="tab"
                          href="#podcast"
                          role="tab"
                          aria-controls="podcast"
                          aria-selected="false"
                          data-target="#homepage-headings"
                          data-slide-to="1"
                        >
                          RELATED ARTISTS
                        </a>
                      </li>
                      <li
                        className="nav-item d-none d-md-flex"
                        role="presentation"
                      >
                        <a
                          className="nav-link"
                          id="moods-and-genres-tab"
                          data-toggle="tab"
                          href="#moods-and-genres"
                          role="tab"
                          aria-controls="moods-and-genres"
                          aria-selected="false"
                          data-target="#homepage-headings"
                          data-slide-to="2"
                        >
                          ABOUT
                        </a>
                      </li>

                      <button
                        className="dropdown-toggle d-md-none"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={{
                          background: "transparent",
                          fontSize: "10px",
                          border: "none",
                          color: "whitesmoke",
                          fontWeight: "500",
                          letterSpacing: "0.1em",
                          marginBottom: "22px",
                          marginLeft: "5px",
                        }}
                      >
                        MORE
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a className="dropdown-item" href="#">
                          OVERVIEW
                        </a>
                        <a className="dropdown-item" href="#">
                          RELATED ARTIST
                        </a>
                        <a className="dropdown-item" href="#">
                          ABOUT
                        </a>
                      </div>
                    </ul>
                  </div>

                  <div className="">
                    <h1>TOP 50</h1>
                    <Row>
                      <AlbumCovers
                        loading={this.state.loading}
                        query={this.state.artist.name}
                        data={this.state.artistAlbum}
                      />
                    </Row>
                    {/* <div className="row no-gutters">
                      <div className="trending card col-12 col-md-3 col-lg-2 mb-4">
                        <img
                          className="card-img-top"
                          src="images/queen_1.png"
                          alt="spotify_playlist_1"
                        />
                        <FaSpotify className="spotify-card-icon fab fa-spotify" />
                        <span className="overlay-icons">
                          <FaRegHeart className="heart far fa-heart fa-sm mr-3" />
                          <FaPlay className="play fas fa-play fa-1x mr-3" />
                          <FaEllipsisH className="fa fa-ellipsis-h fa-sm" />
                        </span>
                        <div>
                          <h6 className="d-block text-truncate">
                            Bohemian Rhapsody (The Orginal Soundtrack)
                          </h6>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </section>
            </Row>
          )}
        </Container>
        <Player />
      </>
    );
  }
}
