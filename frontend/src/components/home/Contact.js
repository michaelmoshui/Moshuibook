export default function Contact(props) {
  return (
    <div className="contact-item">
      <img src={props.img}></img>
      <span className="name">
        {props.firstName} {props.lastName}
      </span>
    </div>
  );
}
