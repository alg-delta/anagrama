import { useState, useEffect } from "react";
import { WORDS } from "../data";

const shuffle = (word) => [...word].sort(() => 0.5 - Math.random()).join("");

const NUMBER = 3;

export default function AnagramGame({ onFinish }) {
  const [currentWord, setCurrentWord] = useState("");
  const [shuffledWord, setShuffledWord] = useState("");
  const [input, setInput] = useState("");
  const [round, setRound] = useState(1);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [correctLettersCurrent, setCorrectLettersCurrent] = useState("");
  const [wrongLetters, setWrongLetters] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(word);
    setShuffledWord(shuffle(word));
    setInput("");
    setHasAnswered(false);
    setFeedback("");
  }, [round]);

  const handleInputChange = (e) => {
    const val = e.target.value.toLowerCase();

    const lastChar = val[val.length - 1];
    if (lastChar && !currentWord.includes(lastChar)) return;

    if (val.length > currentWord.length || hasAnswered) return;

    setInput(val);

    const targetLetters = currentWord.split("");
    const newLetters = val.split("");

    let newCorrect = 0;
    let newWrong = 0;

    for (let i = 0; i < newLetters.length; i++) {
      if (newLetters[i] === targetLetters[i]) {
        newCorrect++;
      } else {
        newWrong++;
      }
    }
    setCorrectLettersCurrent(newCorrect);
    // setCorrectLetters((prev) => prev + (newCorrect - correctLetters));
    setWrongLetters((prev) => prev + newWrong); // <- рахуємо всі спроби

    if (val === currentWord) {
      setHasAnswered(true);
      setFeedback("✅ Вірно!");
    }
  };

  const handleNext = () => {
    setCorrectLetters((prev) => prev + correctLettersCurrent);
    setCorrectLettersCurrent(0);
    if (round < NUMBER) {
      setRound((r) => r + 1);
    } else {
      onFinish({
        correct: correctLetters + correctLettersCurrent,
        wrong: wrongLetters,
      });
    }
  };

  return (
    <div>
      <h2>
        Спроба {round} з {NUMBER}
      </h2>
      <h3>Анаграма: {shuffledWord}</h3>
      <input
        value={input}
        onChange={handleInputChange}
        disabled={hasAnswered}
        autoFocus
      />
      <div style={{ marginTop: "10px" }}>
        {currentWord.split("").map((letter, i) => {
          const userLetter = input[i];
          let color = "black";

          if (userLetter) {
            color = userLetter === letter ? "green" : "red";
          }

          return (
            <span
              key={i}
              style={{
                color,
                fontWeight: "bold",
                marginRight: "5px",
                fontSize: "30px",
                border: "1px solid grey",
                width: "50px",
                height: "50px",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {userLetter || "_"}
            </span>
          );
        })}
      </div>

      {feedback && (
        <h3 style={{ color: "green", marginTop: "10px" }}>{feedback}</h3>
      )}

      {hasAnswered && (
        <button
          onClick={handleNext}
          style={{ marginTop: "10px" }}
          className="begin"
        >
          {round < NUMBER ? "Наступне слово" : "Результат"}
        </button>
      )}
    </div>
  );
}
