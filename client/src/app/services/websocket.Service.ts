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

    // LISTEN
    listenSocket(action, pseudo) {
        //listen
        this.onListen = <Subject<any>>this
            .connect(action, pseudo)
            .map((response: any): any => {
                return response;
            })
    }

    // EMIT
    sendSocket(msg) {
        this.onListen.next(msg);
    }

    // PRINCIPAL FUNCTION
    connect(action, pseudo): Rx.Subject<MessageEvent> {
        // server path
        this.socket = io('http://localhost:5000');

        // emit the user name
        this.socket.emit( 'pseudo', pseudo);

        //recept a user connected
        this.socket.on('pseudo', (pseudo)=>{
            console.log(pseudo, ' est connecter');
        });

        // recept a user disconnected
        this.socket.on('disconnect', ()=>{
            console.log(pseudo, ' est déconnecter');
        });

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

    // DISCONNECT
    disconnect(){
        this.socket.disconnect();
    }

}