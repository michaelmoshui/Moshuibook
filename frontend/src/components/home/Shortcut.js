export default function Shortcut(props) {
  return (
    <a
      href={props.link}
      target="_blank"
      rel="noreferrer"
      className="shortcut-item hover1"
    >
      <img src={props.img}></img>
      <span>{props.name}</span>
    </a>
  );
}
