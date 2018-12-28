import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';
import { Mensaje } from '../../interfaces/mensaje.interface';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public mensaje: string;
  private elemento: any;
  constructor(public _cs: ChatService) {
    this.mensaje = '';
    this._cs.cargarMensajes().subscribe(() => {
      setTimeout(() => {
        document.getElementById('loader').setAttribute('hidden', 'hidden');
        document.getElementById('lista').removeAttribute('hidden');
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 2000);
    });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje() {
    if (this.mensaje.length === 0) {
      return;
    }

    this._cs
      .agregarMensaje(this.mensaje)
      .then(() => {
        console.log('Mensaje enviado');
        this.mensaje = '';
      })
      .catch(err => {
        console.error('Error al enviar mensaje', err);
      });
  }
}
