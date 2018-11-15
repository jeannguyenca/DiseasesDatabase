import React from "react";
import {Button} from "reactstrap";

const randomColor = ["primary", "secondary", "success", "info", "warning"];
const Buttons = (props) => {
 const { diseases, buttonHandle, selectedOption } = props;
  // const diseaseNames = Object.keys(diseases);

  const buttonCollections = Object.keys(diseases).map((disease, index) =>
    disease === selectedOption ? (
      <Button
        color={randomColor[index % randomColor.length]}
        key={disease}
        onClick={() => {
          buttonHandle(disease);
        }}
      >
        {diseases[disease]["name"]}
      </Button>
    ) : (
      <Button
        color={randomColor[index % randomColor.length]}
        outline
        key={disease}
        onClick={() => {
          buttonHandle(disease);
        }}
      >
          {diseases[disease]["name"]}
      </Button>
    )
  );
 return (
  <div>
   {buttonCollections}
  </div>
 );
};

export default Buttons;
