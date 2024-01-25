import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const CommonCard = ({
  CardContentStyl,
  titleText,
  descriptionText,
  titleTextStyl,
  descriptionStyle,
}) => {
  const defaultCardContentStyle = {
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    backgroundColor:"#F6E4D0"
  };
  const defatDescriptionStyle = {
    marginTop: 10,
    maxHeight: 20,
    marginBottom: 30,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    fontSize: "15px",
  };
  const titleContainerStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    WebkitLineClamp: 1,
    fontWeight: "bold",
    fontSize: "17px",
  };

  return (
    <Card>
      <CardContent
        style={{
          ...defaultCardContentStyle,
          ...CardContentStyl,
        }}
      >
        <div style={{...titleContainerStyle, ...titleTextStyl }}>
          {titleText}
        </div>

        <div style={{ ...defatDescriptionStyle, ...descriptionStyle }}>
          {descriptionText}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommonCard;
