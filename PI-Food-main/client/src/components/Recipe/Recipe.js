import { Link } from "react-router-dom";

export default function Recipe({
  title,
  image,
  id,
}) {
  return (
    <div>
      <Link to={`/recipes/${id}`}>
        <h4>{title}</h4>
      </Link>
      <img src={image} alt={'imagen'} />
    </div>
  );
}
