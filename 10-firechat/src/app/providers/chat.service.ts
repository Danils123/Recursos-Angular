import { Injectable } from '@angular/core';
import { Mensaje } from '../interfaces/mensaje.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chats: Mensaje[] = [];
  public usuario: any = {};
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log('Estado del usuario', user);
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      this.usuario.image = user.photoURL;
    });
  }

  login(proveedor: string) {
    switch (proveedor.toLowerCase()) {
      case 'github':
        this.afAuth.auth
          .signInWithPopup(new auth.GithubAuthProvider())
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
          });
        break;
      case 'google':
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
        break;
      default:
        console.log('No existe login para ese tipo de proveedor');
        break;
    }
  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref =>
      ref.orderBy('fecha', 'desc').limit(5)
    );
    return this.itemsCollection.valueChanges().pipe(
      map(mensajes => {
        console.log(mensajes);
        this.chats = [];
        for (const mensaje of mensajes) {
          let fecha = `${mensaje.fecha.substr(0, 2)}/${mensaje.fecha.substr(
            2,
            2
          )}/${mensaje.fecha.substr(4, 4)}`;
          fecha = fecha === new Date().toLocaleDateString() ? 'Hoy' : fecha;

          mensaje.fecha = `${fecha}  ${mensaje.fecha.substr(
            8,
            2
          )}:${mensaje.fecha.substr(10, 2)}:${mensaje.fecha.substr(12, 2)}`;
          this.chats.unshift(mensaje);
        }
        return this.chats;
        // this.chats = mensajes;
      })
    );
  }
  agregarMensaje(texto: string) {
    const id = this.afs.createId();
    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: `${new Date().getUTCDate()}${new Date().getMonth() +
        1}${new Date().getFullYear()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`,
      uid: this.usuario.uid
    };
    return this.itemsCollection.doc(id).set(mensaje);
  }
}
