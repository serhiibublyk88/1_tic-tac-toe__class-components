import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetGame } from "../actions/gameActions";

class ResetButton extends Component {
  handleReset = () => {
    this.props.resetGame();
  };

  render() {
    return (
      <button
        className="mt-6 px-4 py-2 text-xl text-white bg-black border-none cursor-pointer hover:bg-gray-600"
        onClick={this.handleReset}
      >
        Restart
      </button>
    );
  }
}

ResetButton.propTypes = {
  resetGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  resetGame,
};

export default connect(null, mapDispatchToProps)(ResetButton);
