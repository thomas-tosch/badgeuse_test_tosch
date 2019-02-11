import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, Subject} from 'rxjs';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {

    private socket;
    onListen: Subject<any>;

    constructor() {
    }

    /**
     * Listen the backend
     * @param action
     */
    listenSocket(action) {
        this.onListen = <Subject<any>>this
            .connect(action)
            .map((response: any): any => {
                return response;
            });
    }

    /**
     * Emit to backend
     * @param content
     */
    sendSocket(content) {
        this.onListen.next(content);
    }

    /**
     * Principal function for listen and emit
     * @param action
     */
    connect(action): Rx.Subject<MessageEvent> {
        // server path
        this.socket = io('http://localhost:5000');


        // listen
        const observable = new Observable(observer => {
            this.socket.on(action, (data) => {
                observer.next(data);
            })
            return () => {
                 this.socket.disconnect();
            };
        });

        // emit
        const observer = {
            next: (data: Object) => {
                this.socket.emit(action, data);
            },
        };

        return Rx.Subject.create(observer, observable);
    }


}