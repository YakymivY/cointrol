import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: Socket;

  constructor(private authService: AuthService) {}

  connect(): void {
    //retrieve jwt
    const token = this.authService.getToken();
    this.socket = io('http://localhost:3000', {
      auth: { token },
    });

    this.socket.on('connect', () => {
      console.log('Connected to Websocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Websocket server.');
    });

    this.socket.on('connect_error', (err) => {
      console.error('Connection error: ', err);
    });
  }

  emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  on(event: string, callback: (data: any) => void): void {
    this.socket.on(event, callback);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
