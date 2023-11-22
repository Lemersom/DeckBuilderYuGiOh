import { Card, CardMedia, Typography } from "@mui/material";

export default function ModalContent(props) {
  const doNotClose = (event) => {
    event.stopPropagation();
  };


  return (
    <div className="main-popup" onClick={doNotClose}>
      <div className="main-popup-background">
        <Card className="main-popup-media">
          <CardMedia
            className="popup-media"
            component="img"
            height={"100%"}
            image={props.image}
            alt="Card Image"
          />
        </Card>
        <div className="content-card-popup">
          <Typography variant="h3">Sets: </Typography>
          <ul className="text-content">
            {props.sets &&
              props.sets.map((set) => ( 
                <li className="set-name">{set.set_name}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
