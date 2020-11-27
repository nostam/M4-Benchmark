import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../styles/Player.css";
import {
  FaPlay,
  FaHeart,
  FaRegHeart,
  FaChalkboard,
  FaStepForward,
  FaStepBackward,
  FaRandom,
  FaRedoAlt,
  FaListOl,
  FaLaptop,
  FaVolumeUp,
  FaVolumeDown,
} from "react-icons/fa";
class Player extends Component {
  render() {
    return (
      <>
        <section
          className="player d-flex justify-content-between"
          style={{ width: "100%", position: "fixed" }}
        >
          <div className="player-albumart d-flex align-items-center justify-content-start">
            <div className="nowplaying-albumart mx-3">
              <img src="http://placehold.it/64x64" />
            </div>
            <div className="d-none d-sm-flex flex-column text-left mr-4">
              <div className="nowplaying-title">Now playing title</div>
              <div className="nowplaying-artist">Now playing artist</div>
            </div>
            <div className=" loved-track mr-3">
              <FaRegHeart className="far fa-heart" />
              <FaHeart className="fas fa-heart" />
            </div>
            <FaChalkboard />
          </div>
          <div className="d-flex flex-column py-2 my-1 flex-grow-1">
            <div className="player-btn d-flex align-items-center justify-content-center player-controller my-1 py-1">
              <FaRandom className="d-none d-md-flex fas fa-random fa-md mx-3" />
              <FaStepBackward className="fas fa-step-backward fa-md mx-3" />
              <div className="fa-lg">
                <FaPlay className="fas fa-play fa-md mx-3" />
              </div>
              <FaStepForward class="fas fa-step-backward fa-md mx-3" />
              <FaRedoAlt className="d-none d-md-flex fas fa-redo-alt fg-md mx-3" />
            </div>
            <div className="d-none d-sm-flex flex-row justify-content-between player-nowplaying position-relative">
              <div className="player-nowplaying-time">18:32</div>
              <div className="player-progress">
                <div id="nowplayingProgress"></div>
              </div>
              <div className="player-totaltime">24:42</div>
            </div>
          </div>
          <div className="player-setting d-none d-sm-flex align-items-center justify-content-end">
            <FaListOl className="d-none d-md-flex fas fa-list-ol fa-md mx-2" />
            <FaLaptop className="d-none d-md-flex fas fa-laptop-house fa-md mx-2" />
            <div className="player-volume">
              <FaVolumeUp className="fas fa-volume-up fa-md mx-2" />
              <FaVolumeDown className="fas fa-volume-mute fa-md mx-2" />
              <div id="nowplayingVolume"></div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default withRouter(Player);
