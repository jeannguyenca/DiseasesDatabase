import React, { Component } from "react";
import Planner from "./Planner";
import { Button } from "reactstrap";

class PlannerPage extends Component {
 constructor(){
  super();
  
  this.state = {
   isNewPlan : null
  }
  this.handleButtons=this.handleButtons.bind(this);
 }

 componentDidMount() {

 }

 handleButtons(e){
  console.log(e.target.id);
  if (e.target.id === "newPlan"){this.setState({isNewPlan:true})}
  else if (e.target.id === "editPlan"){this.setState({isNewPlan:false})}
 }

 render(){
  return <React.Fragment>
      <section className="plannerLanding">
       <img src="" alt="" />
       <form>
     <Button
      color="primary"
      key="newPlan"
      id="newPlan"
      onClick={this.handleButtons}
     >
      Create New
     </Button>
     <Button
      color="primary"
      outline
      key="editPlan"
      id="editPlan"
      onClick={this.handleButtons}
     >
      Edit Plan
     </Button>
        </form>
      </section>
      <section>
        {this.state.isNewPlan && <Planner />}
      </section>
    </React.Fragment>;
 }

}

export default PlannerPage;