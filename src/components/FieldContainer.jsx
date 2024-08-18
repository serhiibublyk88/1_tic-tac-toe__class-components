import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setField,
  setCurrentPlayer,
  setGameEnded,
  setIsDraw,
} from "../actions/gameActions";
import {
  selectField,
  selectCurrentPlayer,
  selectIsGameEnded,
} from "../selectors";

class FieldContainer extends Component {
  handleCellClick = (index) => {
    const {
      field,
      currentPlayer,
      isGameEnded,
      setField,
      setCurrentPlayer,
     
    } = this.props;
    if (!field[index] && !isGameEnded) {
      const nextPlayer = currentPlayer === "X" ? "O" : "X";
      const updatedField = [...field];
      updatedField[index] = currentPlayer;
      setField(updatedField);
      setCurrentPlayer(nextPlayer);
      this.checkGameStatus(updatedField);
    }
  };

  checkGameStatus = (field) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (field[a] && field[a] === field[b] && field[a] === field[c]) {
        this.props.setGameEnded(true);
        this.props.setCurrentPlayer(field[a]);
        return;
      }
    }

    if (!field.includes("")) {
      this.props.setGameEnded(true);
      this.props.setIsDraw(true);
    }
  };

  render() {
    const { field } = this.props;
   
    const playerColors = {
      X: "text-blue-500", 
      O: "text-red-500", 
    };
    return (
      <div className="grid grid-cols-3 gap-0">
        {field.map((cell, index) => (
          <button
            key={index}
            className={`w-24 h-24 flex items-center justify-center text-2xl ${
              index % 3 === 2 ? "border-r-0" : "border-r-4"
            } ${
              Math.floor(index / 3) === 2 ? "border-b-0" : "border-b-4"
            } border-black bg-white`}
            onClick={() => this.handleCellClick(index)}
          >
            <span className={playerColors[cell]}>{cell}</span>
          </button>
        ))}
      </div>
    );
  }
}

FieldContainer.propTypes = {
  field: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentPlayer: PropTypes.string.isRequired,
  isGameEnded: PropTypes.bool.isRequired,
  setField: PropTypes.func.isRequired,
  setCurrentPlayer: PropTypes.func.isRequired,
  setGameEnded: PropTypes.func.isRequired,
  setIsDraw: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  field: selectField(state),
  currentPlayer: selectCurrentPlayer(state),
  isGameEnded: selectIsGameEnded(state),
});

const mapDispatchToProps = {
  setField,
  setCurrentPlayer,
  setGameEnded,
  setIsDraw,
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldContainer);
