import { Component } from "react";
import { connect } from "react-redux";
import { resetGame } from "./actions/gameActions";
import FieldContainer from "./components/FieldContainer";
import InformationContainer from "./components/InformationContainer";
import ResetButton from "./components/ResetButton";
import "./index.css"; // Используем CSS-файл для Tailwind CSS

class App extends Component {
  render() {
    return (
      <div className="game container mx-auto p-4">
        <InformationContainer />
        <FieldContainer />
        <ResetButton />
      </div>
    );
  }
}

const mapDispatchToProps = {
  resetGame,
};

export default connect(null, mapDispatchToProps)(App);
