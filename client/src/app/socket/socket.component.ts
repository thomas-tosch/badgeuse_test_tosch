import { Component, OnInit } from '@angular/core';
import {WebsocketService} from "../services/websocket.Service";


@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {


  constructor(private wsService: WebsocketService){
  }

  ngOnInit() {
  }

  onCreateCanal() {
    this.wsService.listenSocket('presence');
    this.wsService.onListen.subscribe(msg => {
      console.log(msg);
    });
  }

  onPresence() {
    this.wsService.sendSocket('test');
  }

  onDeleteCanal() {
    this.wsService.disconnect();
  }

}

