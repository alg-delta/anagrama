import { useState, useEffect } from "react";
import AnagramGame from "./components/AnagramGame";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  const [username, setUsername] = useState("");
  const [started, setStarted] = useState(false);
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem("STORAGE_KEY");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("STORAGE_KEY", JSON.stringify(leaderboard));
  }, [leaderboard]);

  const handleFinish = (score) => {
    setLeaderboard((prev) => {
      // Додаємо нового гравця
      const updated = [...prev, { name: username, score }];

      // Сортуємо за кількістю помилок (wrong) за зростанням
      updated.sort((a, b) => a.score.wrong - b.score.wrong);

      // Якщо хочеш обмежити до топ-10:
      // return updated.slice(0, 10);

      return updated;
    });
    setStarted(false);
  };

  return (
    <div style={{ padding: "20px", width: "800px", margin: "0 auto" }}>
      {!started ? (
        <div>
          <h1 style={{ color: "#c84b76" }}>Гра Анаграма🎈😎</h1>
          <input
            placeholder="Введіть ім'я"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            disabled={!username}
            onClick={() => username && setStarted(true)}
            className="begin"
          >
            Почати
          </button>
          <Leaderboard leaderboard={leaderboard} />
        </div>
      ) : (
        <AnagramGame onFinish={handleFinish} />
      )}
    </div>
  );
}
