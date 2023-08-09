import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';
import { Observable } from 'rxjs';
import { ChatModel } from './models/chat.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  chat$!: Observable<any>;

  messages: any[] = [];

  roomId: string = '';

  newMessage: string = '';

  userName: string = '';

  constructor(private chatService: ChatService) { }

  joinRoom(roomId: string) {
    if(roomId || this.userName) {
      console.log('Already joined in: ', roomId);
      window.alert('You have already joined in a room.');
      this.chat$ = this.chatService.getMessageByRoomId(roomId);
      this.chat$.subscribe((message: any) => {
      this.messages.push(message)
    }
    );
  } else {
    window.alert('Please enter a room id and username');
  }
  }
  

  sendMessage(message: string) {
    let newMessageData: ChatModel = {
      roomId: this.roomId,
      msg: message,
      date: Date.now(),
      from: this.userName
    }
    this.chatService.sendMessageByRoom(newMessageData);
    console.log('Message sent: ', newMessageData);
    
    

  }
}
