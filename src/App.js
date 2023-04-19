import logo from './logo.svg';
import './App.css';
import React from 'react';
import ImagePicker from './ImagePicker';
import Image from './Image'
import ImageOutput from './ImageOutput'
import ImagePrediction from './ImagePrediction';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onImageChange = this.onImageChange.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
    this.populateChart = this.populateChart.bind(this);
    const imgPred = new ImagePrediction();

    // Initialize a state to store chart's data
    this.state = {
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            min: 0,
            max: 100,
            ticks: {
              display: true,
              stepSize: 5
            }
          },
          y: {
            ticks: {
              display: true
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Probability per class',
          },
        },
      },
      chartData: this.populateChart(imgPred)
    };
  }

  onImageChange(src) {
    // Reflect the change if another image is uploaded
    const img = document.querySelector('#img');
    img.src = src;
  }

  onImageUpload(file) {
    // Create a new form that stores the uploaded image
    const formData = new FormData();
    formData.append('img_file', file);

    // Create an http request
    const request = new Request(
      'http://127.0.0.1:8000/cifar10-api/',
      {
        method: 'POST',
        body: formData,
        mode: 'cors'
      }
    );

    // Fetch data from the server after doing the image classification task
    fetch(request)
      .then((result) => result.json())
      .then((data) => {
        const probDict = data.prediction['prob_dict']
        const imgPred = ImagePrediction.create(probDict);
        this.setState({
          chartData: this.populateChart(imgPred)
        });
      });
  }

  populateChart(imgPred) {
    const chartData = {
      labels: ImagePrediction.labels,
      datasets: [{
        label: "Classes' probablilities",
        data: imgPred.getProbList(),
        backgroundColor: [
          'rgb(245, 0, 87)',
          'rgb(81, 2, 253)',
          'rgb(3, 155, 229)',
          'rgb(128, 203, 196)',
          'rgb(100,221,23)',
          'rgb(67, 160, 71)',
          'rgb(253, 206, 2)',
          'rgb(255, 152, 0)',
          'rgb(213, 0, 2)',
          'rgb(96, 125, 139)'
        ],
        borderColor: [
          'rgb(245, 0, 87)',
          'rgb(81, 2, 253)',
          'rgb(3, 155, 229)',
          'rgb(128, 203, 196)',
          'rgb(100,221,23)',
          'rgb(67, 160, 71)',
          'rgb(253, 206, 2)',
          'rgb(255, 152, 0)',
          'rgb(213, 0, 2)',
          'rgb(96, 125, 139)'
        ],
        borderWidth: 1
      }]
    };

    return chartData;
  }

  render() {
    return (
      <div id='master_container'>
        <div id='input_output_container'>
          <div id='input_container'>
            <ImagePicker id='input' onImageChange={this.onImageChange} onImageUpload={this.onImageUpload} />
          </div>
          <div id='output_container'>
            <ImageOutput id='output' data={this.state.chartData} options={this.state.options} />
          </div>
        </div>
        <div id='img_container'>
          <Image id='img' />
        </div>
      </div>
    );
  }
}

export default App;
