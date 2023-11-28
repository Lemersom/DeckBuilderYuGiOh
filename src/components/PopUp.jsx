import { Card, CardMedia } from "@mui/material";

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
      </div>
    </div>
  );
}
