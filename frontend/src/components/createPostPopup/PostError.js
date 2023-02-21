export default function PostError({ error, setError }) {
  return (
    <div className="post-error">
      <div>{error}</div>
      <button
        className="blue-btn"
        onClick={() => {
          setError("");
        }}
      >
        Try again
      </button>
    </div>
  );
}
