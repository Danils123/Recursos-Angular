import { Component, OnInit, Input } from '@angular/core';
import { Mensaje } from '../../interfaces/mensaje.interface';
import { ChatService } from '../../providers/chat.service';
@Component({
  selector: 'app-mensaje-chat',
  templateUrl: './mensaje-chat.component.html',
  styleUrls: ['../chat/chat.component.css']
})
export class MensajeChatComponent implements OnInit {
  @Input() mensaje: Mensaje;
  constructor(public _cs: ChatService) {}

  ngOnInit() {}
}
