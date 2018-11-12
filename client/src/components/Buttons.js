import React from "react";
import {Button} from "reactstrap";

const randomColor = ["primary", "secondary", "success", "info", "warning"];
const Buttons = (props) => {
 const { diseases, buttonHandle, selectedOption } = props;
 const buttonCollections = diseases.map((disease,index) => (
   (disease.code === selectedOption? 
   <Button
    color= {randomColor[index%randomColor.length]}
    key={disease.code}
    onClick={() => {
    buttonHandle(disease.code);
    }}>
    {disease.name}
   </Button> 
  : 
   <Button
    color={randomColor[index%randomColor.length]}
    outline
    key={disease.code}
    onClick={() => {
     buttonHandle(disease.code); 
    }}
    >
    {disease.name}
   </Button> 
   )
 ));
 return (
  <div>
   {buttonCollections}
  </div>
 );
};

export default Buttons;
