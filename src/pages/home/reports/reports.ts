import { Component, ViewChild } from '@angular/core';
import { ViewController, NavController, IonicPage, NavParams } from 'ionic-angular';
import { CueStackProvider } from '../../../providers/cuestack/cuestack';
import chartJs from 'chart.js';
import { StackStatus } from '../../../models/stackstatus.model';
import { CueRate } from '../../../models/cuerate.model';

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
      let stackid = navParams.get('id');
      this.rates = [];
      this.status = [];
      //get all cues to classify
      let goodCueIndex = 0;
      let badCueIndex = 0;
      let neverCueIndex = 0;
      this.cueStack.getCues(stackid).subscribe(data => {
        data.forEach(cue => {
          let rate = '';
          Object.keys(cue.rateAry).map(function(rateIndex){
            let cueRate = new CueRate;
            cueRate = cue.rateAry[rateIndex];
            console.log('cueRate.rate=', cueRate.rate);
            rate = cueRate.rate;
          })
          if (rate === 'good'){
            goodCueIndex++;
          } else if (rate === 'bad'){
            badCueIndex++;
          } else {
            neverCueIndex++;
          }
        })   
        console.log('good=', String(goodCueIndex), ', bad=', String(badCueIndex), ', never=', String(neverCueIndex));
        this.rates.push({name: 'good', count: goodCueIndex});
        this.rates.push({name: 'bad', count: badCueIndex});
        this.rates.push({name: 'never show', count: neverCueIndex});
        });
      //get all stacks to classify
      let favorStackIndex = 0;
      let studyStackIndex = 0;
      let allStackIndex = 0;
      this.cueStack.getStacks().subscribe(data => {
        data.forEach(stack => {
          let status = '';
          Object.keys(stack.statusAry).map(function(statusIndex){
            let stackStatus = new StackStatus;
            stackStatus = stack.statusAry[statusIndex];
            status = stackStatus.status;
          })
          if (status === 'favorite'){
            favorStackIndex++;
          } else if (status === 'study'){
            studyStackIndex++;
          } else {
            allStackIndex++;
          }
        })
        console.log('favor=', String(favorStackIndex), ', study=', String(studyStackIndex), ', all=', String(allStackIndex));
        this.status.push({name: 'favorite', count: favorStackIndex});
        this.status.push({name: 'study', count: studyStackIndex});
        this.status.push({name: 'all', count: allStackIndex});
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
