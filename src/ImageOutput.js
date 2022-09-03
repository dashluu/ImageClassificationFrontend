import React from "react";
import { Chart as ChartJS, Title, Legend } from "chart.js/auto";
import { Bar } from 'react-chartjs-2'
import ImagePrediction from "./ImagePrediction";
import './ImageOutput.css'

class ImageOutput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Bar data={this.props.data} options={this.props.options} id="prob_chart" />
        )
    }
}

export default ImageOutput