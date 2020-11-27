import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { FaSpotify, FaHeart, FaPlay, FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";
export default class AlbumCovers extends Component {
  fetchQuery = (e) => {
    this.setState({ artistName: e.target.innerText });
  };
  fetchSearch = (input) => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${input}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "91cbdcb779mshb25e7872769b4fcp110c07jsnbcf1d17bc30b",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((album) => {
        this.setState({ data: album });
        // search = album.data.map((albumT) => albumT);
        // generateCards(search);
      })

      .catch((err) => {
        console.error(err);
      });
  };
  comoponentDidMount = async () => {
    console.log("from ac");
    // this.fetchSearch(this.props.query);
  };
  render() {
    // const data = this.props.searchQuery;
    return (
      <Col md={{ span: 10, offset: 1 }}>
        <Row className="my-5">
          {console.log("state", this.state, "props", this.props)}
          {this.props.data &&
            this.props.data.map((data) => {
              return (
                <div
                  key={data.id}
                  className="trending card p-0 col-12 col-md-3 col-lg-2"
                >
                  <img
                    className="card-img-top img-fluid"
                    src={data.album.cover_medium}
                    alt={data.album.title}
                  />

                  <FaSpotify className="spotify-card-icon fab fa-spotify" />
                  <span className="overlay-icons">
                    <FaHeart className="heart far fa-heart fa-sm mr-3" />
                    <Link to={`/album/${data.album.id}`}>
                      <FaPlay className="play fas fa-play fa-1x mr-3" />{" "}
                    </Link>
                    <FaEllipsisH className="fa fa-ellipsis-h fa-sm" />
                  </span>
                  <div>
                    <h6 label={data.title}>{data.artist.name}</h6>
                  </div>
                </div>
              );
            })}
        </Row>
      </Col>
    );
  }
}
