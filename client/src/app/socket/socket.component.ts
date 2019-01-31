import { Component, OnInit } from '@angular/core';
import {ChatService} from "../services/chat.service";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {

  messages = [];
  form: FormGroup;

  constructor(private chat: ChatService,
              private formBuilder: FormBuilder){ }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      console.log(msg);
      this.messages.push(msg);
    })
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      msg: ['']
    });
  }

  onSubmit() {
    let msg = this.form.get('msg').value;
    this.chat.sendMsg(msg);
  }


}

