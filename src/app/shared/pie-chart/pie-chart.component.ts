import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit
{
  @Input()
  chartData: { labels: string[]; data: number[]; backgroundColor: string[]; } | undefined;

  public chart: any;

  public ngOnInit(): void
  {
    if (this.chartData)
    {
      const { labels, data, backgroundColor } = this.chartData;

      const chartData = {
        labels: labels,
        datasets: [{
          label: 'Puntos Funcion',
          data: data,
          backgroundColor: backgroundColor
        }]
      };

      this.chart = new Chart("chart", {
        type: 'pie' as ChartType,
        data: chartData,
      });
    }

  }

}
