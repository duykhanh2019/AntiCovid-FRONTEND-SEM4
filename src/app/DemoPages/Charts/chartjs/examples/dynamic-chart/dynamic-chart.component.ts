import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';
import {ChartService} from './chart.service';

@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
})
export class DynamicChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {xAxes: [{}], yAxes: [{}]},
  };
  public barChartLabels: Label[] = ['13/9', '14/9', '15/9', '16/9', '17/9', '18/9', '19/9', '20/9', '21/9', '22/9'];
  // public barChartLabels: Label[];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  chart = [];

  public barChartData: ChartDataSets[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Mắc bệnh'}
  ];

  constructor(private chartService: ChartService) {
  }

  ngOnInit() {
    this.getChart();
  }

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
  getChart() {
    console.log(123);
    this.chartService.getDataChart().subscribe(
      (res: any) => {
        console.log(res);
        this.chart = res;
      }
    );
  }
}
