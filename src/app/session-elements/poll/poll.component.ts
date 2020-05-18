import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../signal-r.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  public chartOptions: any = {
    animation: false,
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
  public chartLabels: string[] = ['How many books has John Brown written?'];
  public chartType: string = 'bar';
  public chartLegend: boolean = true;
  public colors: any[] = [
    { backgroundColor: '#5491DA' },
    { backgroundColor: '#E74C3C' },
    { backgroundColor: '#82E0AA' },
    { backgroundColor: '#E5E7E9' }
  ]

  constructor(public signalRService: SignalRService,
    private http: HttpClient) { }

    ngOnInit(): void {
      this.signalRService.startConnection();
      this.signalRService.addTransferChartDataListener();
    }

}
