import { Component, OnInit } from '@angular/core';
import {ChatService} from "../services/chat.service";
import {WebsocketService} from "../services/websocket.Service";


@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {


  constructor(private wsService: WebsocketService){ }

  ngOnInit() {

    this.wsService.onListen.subscribe(msg => {
      console.log(msg);
    });

  }

  onPresence() {
    this.wsService.sendSocket('test');
  }

}

