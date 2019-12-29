import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: props.chartData
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "top"
  };

  render() {
    
    return (
      <div>
        <Bar
          data={this.state.chartData}
          height={500}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    precision:0,
                    beginAtZero: true
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Followers Per Vacation",
                    fontSize: 20
                  }
                }
              ],
              xAxes: [
                {
                  ticks: {
                    beginAtZero: false                 
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Followed Vacations by Id",
                    fontSize: 20
                  }
                }
              ]
            },
            title: {
              display: this.props.displayTitle,
              text: "Vactions Project Summery",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;

