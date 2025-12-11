import Card from "react-bootstrap/Card";
import CustomButton from "../MainButton/MainButton";
import "./ItemCard.scss";

function ItemCard({
  id,
  titleName,
  description,
  titleDate,
  date,
  cardClassName,
  completed = false,
  onDelete,
  onComplete,
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
      className={`mb-2 ${cardClassName} w-100 ${completed ? "completed" : ""}`}
    >
      <Card.Body>
        <Card.Title>{titleName}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Title>{titleDate}</Card.Title>
        <Card.Text>{formattedDate}</Card.Text>
        <Card.Text>
          Status: {completed ? "Completed ✅" : "Pending ⏳"}
        </Card.Text>
        <div className="button-container">
          <CustomButton className="custom-btn" onClick={onDelete}>
            Remove
          </CustomButton>
          {!completed && (
            <CustomButton className="custom-btn" onClick={onComplete}>
              Mark as Completed
            </CustomButton>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
