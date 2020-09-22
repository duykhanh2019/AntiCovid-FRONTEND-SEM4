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
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  dataChart;

  public barChartData: ChartDataSets[] = [
    {data: [], label: 'Series A'}
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

  getChart() {
    this.chartService.getAll().subscribe(
      (res: any) => {
        this.dataChart = res;
        this.barChartData = [
          {data: res, label: 'Biểu đồ'}
        ];
      }
    );
  }
}
