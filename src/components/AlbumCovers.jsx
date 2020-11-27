import React, { Component } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import {
  FaSpotify,
  FaHeart,
  FaPlay,
  FaEllipsisH,
  FaArrowCircleDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
export default class AlbumCovers extends Component {
  state = { uniqueAlbums: [] };
  uniqueAlbum = (arr) => {
    if (arr.length > 0) {
      const uniqueAlbum = [];
      const map = new Map();
      for (const data of arr) {
        if (!map.has(data.album.title) && !map.has(data.album.id)) {
          map.set(data.album.id, true); // set any value to Map
          uniqueAlbum.push(data);
        }
      }
      console.log(uniqueAlbum, this.state);
      // this.setState({ uniqueAlbums: uniqueAlbum });
      return uniqueAlbum;
    } else {
      console.log("arr empty");
    }
  };

  comoponentDidUpdate = (prevProps) => {
    if (prevProps.data !== this.props.data) {
      this.uniqueAlbum(this.props.data);
    }
  };
  // componentDidMount = () => {
  //   this.uniqueAlbum(this.props.data);
  // };
  render() {
    // const uniqueAlbumArr = this.uniqueAlbum();
    return (
      <Col md={{ span: 10, offset: 1 }}>
        <Row className="my-5">
          {this.props.loading ? (
            [0, 1, 2, 3, 4, 5].map((item) => (
              <Col key={item}>
                <Spinner animation="border" variant="light" />
              </Col>
            ))
          ) : (
            <>
              {this.uniqueAlbum(this.props.data).map((data) => {
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
                      <h6 className="text-truncate" label={data.album.title}>
                        {data.album.title}
                      </h6>
                      <h6 className="text-truncate" label={data.artist.name}>
                        {data.artist.name}
                      </h6>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </Row>
      </Col>
    );
  }
}
