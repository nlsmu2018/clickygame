import React, { Component } from 'react';
import './App.css';

let characters = [
  {
    id: 1,
    name: "Bugs Bunny",
    image: "img/bugs.jpg"
  },
  {
    id: 2,
    name: "Courage the Cowardly Dog",
    image: "img/courage.jpg"
  },
  {
    id: 3,
    name: "Mr. Crabs",
    image: "img/crabs.jpg"
  },
  {
    id: 4,
    name: "Dexter",
    image: "img/dexter.jpg"
  },
  {
    id: 5,
    name: "Doug Funnie",
    image: "img/doug.jpg"
  },
  {
    id: 6,
    name: "Johnny Bravo",
    image: "img/johny.jpg"
  },
  {
    id: 7,
    name: "Ickis",
    image: "img/monster.jpg"
  },
  {
    id: 8,
    name: "Captain Planet",
    image: "img/planet.jpg"
  },
  {
    id: 9,
    name: "Rocko",
    image: "img/rocko.jpg"
  },
  {
    id: 10,
    name: "SpongeBob SquarePants",
    image: "img/spongebob.jpg"
  },
  {
    id: 11,
    name: "Squidward",
    image: "img/squidward.jpg"
  },
  {
    id: 12,
    name: "Tommy Pickles",
    image: "img/tommy.jpg"
  },
];

class App extends Component {
  state = {
    characters: characters,
    score: 0,
    topScore: 0,
    charactersClicked: [],
    message: "Click on an cartoon to earn points, but don't click on any more than once!"
  };

  shuffleCharacters() {
    let c = this.state.characters;

    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }

    this.setState({characters: c});
  }

  clickCharacter(id, name) {
    this.setState({message: "You found " + name + "!"});
    if (this.state.charactersClicked.indexOf(id) === -1) {
      this.correctAnswer();
      this.setState({charactersClicked: this.state.charactersClicked.concat(id)});
      this.shuffleCharacters();
    } else {
      this.setState({
        message: "You lose! Your score was: " + this.state.score + "! Click a character to try again!",
        score: 0,
        charactersClicked: [],
      });

      this.shuffleCharacters();
    }
  }

  correctAnswer() {
    let newScore = this.state.score + 1;
    this.setState({score: newScore});

    if (newScore > this.state.topScore) {
      this.setState({topScore: newScore});
    }

    if (newScore === this.state.characters.length) {
      this.setState({
        message: "You found all the characters! Click any character to try again!",
        score: 0,
        charactersClicked: [],
      });
    }
  }

  render() {
    return (
      <div>
        <div className="navigation d-flex flex-column flex-md-row align-items-center p-3 px-md-4 main-nav">
          <h5 className="navigation-title mr-md-auto font-weight-normal">Cartoon Clicky Game!</h5>
          <nav className="my-2 my-md-0 mr-md-3">
            <p className="nav-scores">Score: {this.state.score} | Top Score: {this.state.topScore}</p>
          </nav>
        </div>
        <div className="jumbotron jumbotron-fluid banner">
          <div className="container">
            <p className="message">{this.state.message}</p>
          </div>
        </div>
        <div className="App">
          <div className="row characters">
            {this.state.characters.map(character => (
              <div onClick={() => this.clickCharacter(character.id, character.name)}>
                <img src={character.image} className="character" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
