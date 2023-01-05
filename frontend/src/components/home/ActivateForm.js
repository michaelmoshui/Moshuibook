import PropagateLoader from "react-spinners/PropagateLoader";

export default function ActivateForm({ type, header, text, loading }) {
  return (
    <div className="blur">
      <div className="popup">
        <div
          className={`popup-header ${
            type === "success" ? "success-text" : "error-text" // green or red
          }`}
        >
          {header}
        </div>
        <div className="popup-message">{text}</div>
        <PropagateLoader // This is the loading thingy!
          color="#1876f2"
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}
