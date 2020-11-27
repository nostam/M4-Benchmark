import React, { Component } from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaPlay,
  FaHeart,
  FaEllipsisH,
  FaEllipsisV,
  FaRegHeart,
  FaPlayCircle,
  FaPauseCircle,
} from "react-icons/fa";
import "../styles/AlbumPage.css";
import NavBar from "./NavBar";
import Player from "./Player";

export default class AlbumPage extends Component {
  state = { loading: true, err: false, albumId: null, album: {} };

  url = "https://deezerdevs-deezer.p.rapidapi.com/album/";
  // handleNavTab = (e) => {
  //   this.setState({ artistName: e.target.innerText });
  // };
  duration = (time) => {
    const min = time / 60;
    return min <= 60
      ? `${Math.floor(min)} MIN`
      : `${Math.floor(min / 60)} HR ${min} MIN}`;
  };

  durationTrack = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
      min = `0${min.toString()}`;
    }
    let sec = (time % 60).toString();
    if (sec < 10) {
      sec = `0${sec.toString()}`;
    }
    return min + ":" + sec;
  };
  searchDeezerAlbum = (albumId) => {
    Promise.all([
      fetch(this.url + albumId, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "74a8e76fbamshe2a8991c5162cf0p18ff5ajsn4ac24c69ec4a",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((responseObject) => {
          this.setState({ album: responseObject }, () =>
            setTimeout(() => this.setState({ loading: false }), 2000)
          );
        }),
    ])
      .then(() => this.setState({ loading: false }))
      .catch((err) => {
        this.setState({ err: true });
        this.setState({ loading: false });
        console.log("An error has occurred:", err);
      });
  };
  handleErr = (msg) => {
    this.setState({ err: true, errMsg: msg });
  };
  componentDidMount = () => {
    let albumId = this.props.match.params.albumId;
    this.setState({ loading: true, alertMsg: "Loading Album Info" });
    albumId
      ? this.searchDeezerAlbum(albumId)
      : this.handleErr("Invalid Album Id");
  };
  // componentDidUpdate = (prevProps, PrevState) => {
  //   if (PrevState.artistName !== this.state.artistName) {
  //     this.searchDeezerAlbum();
  //   }

  render() {
    // let {album } = this.state.album;
    return (
      <>
        {/* {console.log("render", this.state)} */}
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
              <div className="albums-holder col-9 p-0">
                <section style={{ overflowY: "auto" }} id="albums-section">
                  {/*        <div className='album-header' id='header'>
          <div className='arrow-container'>
            <a href='#'><i className="fas fa-chevron-circle-left fa-2x mr-2"></i></a>
            <a href='#'><i className="fas fa-chevron-circle-right fa-2x"></i></a>
          </div>

          <div className='header-btns'>

            <a href='#'><button className='upgrade-btn' value='upgrade' style={{marginRight: "20px"}}>UPGRADE</button></a>

            <div className="dropdown">
              <button className="profile-btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className='user-icon'>
                  <i className="fas fa-user"></i>
                </span>
                User
              </button>
              <div className="dropdown-menu" style='background: black; color: white;' aria-labelledby="dropdownMenuButton" >
                <a className="dropdown-item" style='background: black; color: white;' href="#">Acount</a>
                <a className="dropdown-item" style='background: black; color: white;' href="#">Profile</a>
                <a href= "login.html"className="dropdown-item" style='background: black; color: white;' href="#">Log-out</a>
              </div>
            </div>

          </div>
        </div> */}
                  <div className="album row">
                    <div className="col-12 col-md-6 col-lg-4">
                      <img
                        id="coverAlbum"
                        className="album-cover img-fluid"
                        src={this.state.album.cover_medium}
                        alt={this.state.album.title}
                      />
                    </div>
                    <div className="album-details col-12 col-md-6 col-lg-8">
                      <h4 className="mt-2">albums</h4>
                      <h2 id="albumName">{this.state.album.title}</h2>
                      <div className="mt-4 last-line">
                        <Link to={`/artist/${this.state.album.artist.id}`}>
                          <img
                            src={this.state.album.artist.picture_small}
                            alt={this.state.album.artist.name}
                            className="group-img"
                          />
                          <h6>
                            <span lassName="group-name">
                              {this.state.album.artist.name}
                            </span>
                          </h6>
                        </Link>
                        <p className="album-length">
                          {this.state.album.release_date.substr(0, 4) + " • "}
                          {this.state.album.nb_tracks + " SONGS"}
                          {", " + this.duration(this.state.album.duration)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="playlist">
                    <div className="playlist-btns mt-3 mb-3">
                      <FaPauseCircle className="fas fa-pause-circle fa-3x" />
                      <FaPlayCircle className="fas fa-play-circle fa-3x" />
                      <FaRegHeart className="far fa-heart fa-2x mr-3 ml-3" />
                      <FaHeart className="fas fa-heart fa-2x mr-3 ml-3" />
                      <FaEllipsisH className="fa fa-ellipsis-h fa-2x" />
                    </div>
                    <div className="playlist-table">
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col th-sm">
                              <span># </span>
                            </th>
                            <th
                              scope="col th-lg"
                              style={{ paddingLeft: "50px" }}
                            >
                              Title
                            </th>
                            <th scope="col th-sm">
                              <i className="far fa-clock"></i>
                            </th>
                            <div
                              style={{
                                borderBottom: "1px solid #b3b3b3",
                                width: "90%",
                              }}
                            ></div>
                          </tr>
                        </thead>

                        <tbody>
                          {this.state.album.tracks.data.map((track, index) => (
                            <tr className="songRow" key={("track-", index)}>
                              <th
                                scope="row"
                                style={{ verticalAlign: "middle" }}
                              >
                                <span className="track-num">{index}</span>
                                <img
                                  src="https://img.icons8.com/android/16/b3b3b3/play.png"
                                  className="track-play play-track-btn"
                                />
                                {/* <FaPlay className="track-play play-track-btn fa-10x" onClick="printInnerText()"/> */}
                              </th>
                              <td>
                                <ul>
                                  <li className="song">{track.title}</li>
                                  <li
                                    className="group"
                                    style={{ verticalAlign: "middle" }}
                                  >
                                    {this.state.album.artist.name}
                                  </li>
                                </ul>
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                <FaHeart className="track-heart" />
                                {this.durationTrack(track.duration)}
                                <FaEllipsisH className="track-dots" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="playlist-footer">
                      {this.state.album.release_date.substr(0, 4)}{" "}
                      {this.state.album.label}
                    </p>
                  </div>
                </section>
              </div>
            </Row>
          )}
        </Container>
        <Player />
      </>
    );
  }
}
