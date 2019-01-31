import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, Subject} from 'rxjs';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {

    private socket;
    onListen: Subject<any>;

    constructor() {
        //listen
        this.onListen = <Subject<any>>this
            .connect('presence')
            .map((response: any): any => {
                return response;
            })
    }

    // emit
    sendSocket(msg) {
        this.onListen.next(msg);
    }

    // PRINCIPAL FUNCTION
    connect(action): Rx.Subject<MessageEvent> {
        // server path
        this.socket = io('http://localhost:5000');

        // listen
        let observable = new Observable(observer => {
            this.socket.on(action, (data) => {
                observer.next(data);
            })
            return () => {
                this.socket.disconnect();
            }
        });

        //emit
        let observer = {
            next: (data: Object) => {
                this.socket.emit(action, data);
            },
        };

        return Rx.Subject.create(observer, observable);
    }

}