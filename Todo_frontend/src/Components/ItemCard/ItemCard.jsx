import Card from "react-bootstrap/Card";
import "./ItemCard.scss";

function ItemCard({
  id,
  titleName,
  description,
  titleDate,
  date,
  cardClassName,
  completed = false,
  onClick,
}) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Card
      className={`mb-2 ${cardClassName} w-100 ${
        completed ? "completed" : ""
      } item-card-clickable`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Body>
        <Card.Title>{titleName}</Card.Title>
        <Card.Text className="text-muted small d-flex justify-content-between">
          <span>
            {titleDate}: {formattedDate}
          </span>
          <span style={{ fontWeight: "bold" }}>
            {completed ? "COMPLETED ✅" : "PENDING ⏳"}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
