import React, { Component } from "react";
import SimpleLineChart from './components/LineChart';
import "whatwg-fetch";

class ChartContainer extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      selectedOption: '',
      default:[
        { year: "2016", cases: 0 },
        { year: "2017", cases: 0 },
        { year: "2018", cases: 0 },
      ]
    };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.dataHandle = this.dataHandle.bind(this);
    this.loadDataFromServer = this.loadDataFromServer.bind(this);
  }

  componentDidMount() {
    if(this.props.show){
      this.loadDataFromServer();
      if (!this.pollInterval) {
        this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
      }
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.country !== prevProps.country) {
      this.loadDataFromServer();
    }
  }

  handleOptionChange (changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }


  dataHandle(){
    if(this.state.selectedOption === 'cho'){
      return <SimpleLineChart data={this.state.cho} />;
    } else if (this.state.selectedOption === 'ntd'){
      return <SimpleLineChart data={this.state.ntd} />;
    } else if (this.state.selectedOption === "whs") {
      return <SimpleLineChart data={this.state.whs} />;
    } else 
    return <SimpleLineChart data={this.state.default} />;
  }

  loadDataFromServer = () => {
    fetch(`api/databases/${this.props.country}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(data => data.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else {
          this.setState({
            cho: res.data[0].slice(1),
            ntd: res.data[1].slice(1),
            whs: res.data[2].slice(1)
          });
        }

      })
      .then(() => {
        if(this.state.cho.length !== 0){
          this.setState({selectedOption : 'cho'})
        } else if (this.state.ntd.length !== 0){
          this.setState({ selectedOption: 'ntd' })
        }else if (this.state.whs.length !== 0){
          this.setState({selectedOption: 'whs'})
        }
      }

      );
  }
  

  render() {
    return <div className="chart" style={{ height: "300px" }}>
        {this.dataHandle()}

        <form>
          <div className="radio" style={this.state.cho.length < 1 ? { display: "none" } : {}}>
            <label>
              <input type="radio" value="cho" checked={this.state.selectedOption === "cho"} onChange={this.handleOptionChange} />
              Cholera
            </label>
          </div>

          <div className="radio" style={this.state.ntd.length < 1 ? { display: "none" } : {}}>
            <label>
              <input type="radio" value="ntd" checked={this.state.selectedOption === "ntd"} onChange={this.handleOptionChange} />
              Human African Trypanosomiasis
            </label>
          </div>

          <div className="radio" style={this.state.whs.length < 1 ? { display: "none" } : {}}>
            <label>
              <input type="radio" value="whs" checked={this.state.selectedOption === "whs"} onChange={this.handleOptionChange} />
              Japanese encephalitis
            </label>
          </div>
        </form>
      </div>;
  }
}

export default ChartContainer;