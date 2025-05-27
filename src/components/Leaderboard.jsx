export default function Leaderboard({ leaderboard }) {
  if (!leaderboard || leaderboard.length === 0) {
    return <div style={{ marginTop: "20px" }}>Результатів поки немає</div>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Рейтинг</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={cellStyle}>Місце</th>
            <th style={cellStyle}>Ім'я</th>
            <th style={cellStyle}>✅ Правильних літер</th>
            <th style={cellStyle}>❌ Помилкових літер</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map(({ name, score }, index) => (
            <tr key={index}>
              <th style={cellStyle}>{index + 1}</th>
              <td style={cellStyle}>{name}</td>
              <td style={cellStyle}>{score.correct}</td>
              <td style={cellStyle}>{score.wrong}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "center",
  fontSize: "18px",
};
