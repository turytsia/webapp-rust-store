import "./wrapper.css";

export default function Wrapper(props) {
  return <section className="wrapper">{props.children}</section>;
}
