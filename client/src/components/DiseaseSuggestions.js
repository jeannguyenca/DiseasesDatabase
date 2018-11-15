import React, { Component } from "react";
import { Col } from "reactstrap";

class DiseaseSuggestions extends Component {

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.info !== prevProps.info) {
  //     console.log("Changed");
  //     this.dataHandle();
  //   }
  // }

  dataHandle(data){
    return Object.keys(data.info).map((section) => {
      return (
        data.info[section].length < 4 ?
          <div key={section}>
           <h4>{section}</h4>
            {data.info[section].map((line,index) => {
              return(<li key={index}>{line}</li>)
            })}
           </div>
           :
          <div key={section}>
          <h4>{section}</h4> <p>{data.info[section]}</p>
          </div>
      ) 
   })
 }

 render(){
  return <React.Fragment>
      <Col xs={{ size: 3, offset: 1 }}>
       <h3>Be Prepared</h3>
      </Col>
      <Col xs="7">
      {this.dataHandle(this.props.info)}
      </Col>
    </React.Fragment>;
 }
}
export default DiseaseSuggestions;