import "./button.css";

export default function Button(props) {
  const classes = props.reversed ? "button--reversed" : "";
  const onClick = (e) => {
    e.stopPropagation();
    if (props.onClick) {
      props.onClick(e);
    }
  };
  return (
    <button
      onClick={onClick}
      className={`button ${classes} ${props.className}`}
      disabled={props.disabled}
      type={props.type || "button"}
    >
      {props.children}
    </button>
  );
}
