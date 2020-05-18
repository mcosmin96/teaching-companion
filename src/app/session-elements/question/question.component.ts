import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../signal-r.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(public signalRService: SignalRService,
    private http: HttpClient) { }

    ngOnInit(): void {
      this.signalRService.startConnection();
      this.signalRService.addReceiveQuestionListener();
    }

    public askQ = (event) => {
      console.log(event);
      this.signalRService.askQuestion();
    }

}
