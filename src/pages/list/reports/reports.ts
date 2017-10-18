import { Component, ViewChild } from '@angular/core';
import { ViewController, NavController, IonicPage, NavParams } from 'ionic-angular';
import { CueStackProvider } from '../../../providers/cuestack/cuestack';
import chartJs from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('pieCanvas') pieCanvas;

  barChart: any;
  pieChart: any;
  title: string;
  userid: string;
  rates: Array<{name: string, count: number}>;
  status: Array<{name: string, count: number}>;
  
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public navCtrl: NavController,
    private cueStack: CueStackProvider) {
      this.title = navParams.get('title');
      //get all cues to classify
      let id = navParams.get('id');
      let cues = this.cueStack.getCues(id);
      cues.subscribe(data => {
        this.rates = [];
        let goodCue = data.filter(item => item.rate === 'good');                
        this.rates.push({name: 'good', count: goodCue.length})
        let badCue = data.filter(item => item.rate === 'bad');
        this.rates.push({name: 'bad', count: badCue.length})
        let neverCue = data.filter(item => item.rate === 'never show');
        this.rates.push({name: 'never show', count: neverCue.length})
      });
      //get all stacks to classify
      let stacks = this.cueStack.getStacks();
      stacks.subscribe(data => {
        this.status = [];   
        let favoriteStack = data.filter(item => item.status === 'favorite');                
        this.status.push({name: 'favorite', count: favoriteStack.length})
        let studyStack = data.filter(item => item.status === 'study');
        this.status.push({name: 'study', count: studyStack.length})
        let allStack = data.filter(item => item.status === 'all');
        this.status.push({name: 'all', count: allStack.length})
      });      
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.barChart = this.getBarChart();
    }, 150);
    setTimeout(() => {
      this.pieChart = this.getPieChart();
    }, 350);

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    });
  }

  getPieChart() {
    const data = {
      labels: [this.rates[0].name, this.rates[1].name, this.rates[2].name],
      datasets: [
        {
          data: [this.rates[0].count, this.rates[1].count, this.rates[2].count],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    };
    return this.getChart(this.pieCanvas.nativeElement, 'pie', data);
  }

  getBarChart() {
    const data = {
      labels: [this.status[0].name, this.status[1].name, this.status[2].name],
      datasets: [{
        label: '# of Votes',
        data: [this.status[0].count, this.status[1].count, this.status[2].count],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }

}
