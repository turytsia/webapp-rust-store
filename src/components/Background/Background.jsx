import './background.css'

import background from "../../data/images/main.png";

export default function Background(props) {
  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${background})` }}
    >
      {props.children}
    </div>
  );
}
