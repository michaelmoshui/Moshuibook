export default function LeftLink(props) {
  return (
    <div className="left-link hover1">
      <img src={`../../../left/${props.image}.png`} alt="" />
      {props.notification !== undefined ? (
        <div className="col">
          <div className="col-1">{props.text} </div>
          <div className="col-2">{props.notification}</div>
        </div>
      ) : (
        <span>{props.text}</span>
      )}
    </div>
  );
}
