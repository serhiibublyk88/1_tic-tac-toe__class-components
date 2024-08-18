import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  selectCurrentPlayer,
  selectIsGameEnded,
  selectIsDraw,
} from "../selectors";

class InformationContainer extends Component {
  render() {
    const { currentPlayer, isGameEnded, isDraw } = this.props;
    return (
      <div className="my-4 text-2xl">
        {isDraw && <div className="text-red-500">Draw</div>}
        {!isDraw && isGameEnded && (
          <div className="text-green-500">
            Winner: {currentPlayer === "X" ? "X" : "O"}
          </div>
        )}
        {!isGameEnded && (
          <div>
            Turn:{" "}
            <span
              className={
                currentPlayer === "X" ? "text-blue-500" : "text-red-500"
              }
            >
              {currentPlayer}
            </span>
          </div>
        )}
      </div>
    );
  }
}

InformationContainer.propTypes = {
  currentPlayer: PropTypes.string.isRequired,
  isGameEnded: PropTypes.bool.isRequired,
  isDraw: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currentPlayer: selectCurrentPlayer(state),
  isGameEnded: selectIsGameEnded(state),
  isDraw: selectIsDraw(state),
});

export default connect(mapStateToProps)(InformationContainer);
