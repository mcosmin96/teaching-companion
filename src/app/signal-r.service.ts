import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ChartModel } from './_interfaces/chart.model';
import { threadId } from 'worker_threads';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: ChartModel[];
  public broadcastedData: ChartModel[];

  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:8346/hub/chart')
    .build();

    this.hubConnection
    .start()
    .then(() => console.log('Hub connection started'))
    .catch(err => console.log('Error starting hub connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('TransferChartData', (data) => {
      this.data = data;
      console.log("Hub data: " + data);
    })
  }

  public broadcastChartData = () => {
    const data = this.data.map(m => {
      const temp = {
        data: m.data,
        lavel: m.label
      }
      return temp;
    });

    this.hubConnection.invoke('BroadcastChartData', data)
    .catch(err => console.log(err));
  }

  public addBroadcastChartDataListener = () => {
    this.hubConnection.on('BroadcastChartData', (data) => {
      this.broadcastedData = data;
    })
  }
}
