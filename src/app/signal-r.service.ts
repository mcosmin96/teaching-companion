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

  public questions: string[] = [];
  public name: string = "Anonymous";
  public question: string;


  private hubConnection: signalR.HubConnection;

  // starting connection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:8346/hub/chart')
    .build();

    this.hubConnection
    .start()
    .then(() => console.log('Hub connection started'))
    .catch(err => console.log('Error starting hub connection: ' + err))
  }

  // receiving poll data
  public addTransferChartDataListener = () => {
    this.hubConnection.on('TransferChartData', (data) => {
      this.data = data;
      console.log("Hub data: " + data);
    })
  }

  // receiving question data
  public addReceiveQuestionListener = () => {
    this.hubConnection.on('ReceiveQuestion', (name, question) => {
      this.questions.push(name + " asks " + question);
    })
  }

  // send poll data
  public broadcastChartData = () => {
    const data = this.data.map(m => {
      const temp = {
        data: m.data,
        label: m.label
      }
      return temp;
    });

    this.hubConnection.invoke('BroadcastChartData', data)
    .catch(err => console.log(err));
  }

  // poll listener
  public addBroadcastChartDataListener = () => {
    this.hubConnection.on('BroadcastChartData', (data) => {
      this.broadcastedData = data;
    })
  }

  // send question
  public askQuestion = () => {
    const name = this.name;
    const question = this.question;

    this.hubConnection.invoke('SendQuestion', name, question)
    .catch(err => console.log(err));
  }

  // question listener
  public addAskQuestionListener = () => {
    this.hubConnection.on('SendQuestion', (name, question) => {
      this.name = name;
      this.question = question;
    })
  }

}
