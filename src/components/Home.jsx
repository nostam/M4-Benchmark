import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Home.css";
import NavBar from "./NavBar";
import Player from "./Player";
// import AlbumCovers from "./AlbumCovers"
export default class Home extends Component {
  handleNavTab = (e) => {
    console.log("clicked", e.currentTarget.value, e.target.value);
    this.setState({ artistName: e.currentTarget.value });
  };
  render() {
    return (
      <>
        {" "}
        <Player />
        <NavBar />
        <Container>
          <Row className="my-4 mx-5">
            <Col
              md={4}
              onClick={(e) => this.handleNavTab(e)}
              value="Ringo Shinna"
              label="Ringo Shinna"
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
          <Row>{/* <AlbumCovers artistName={this.state.artistName} /> */}</Row>
        </Container>
      </>
    );
  }
}
