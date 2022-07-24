import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from 'express';
import { webSocket } from "rxjs/webSocket";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @ViewChild('screen') Screen: ElementRef | undefined;

  base64data: any;
  appName = "";
  isBegin = false;
  api = 'ws://3.87.60.121:3000';
  //api='ws://localhost:3000';
  subject = webSocket({ url: this.api, deserializer: msg => msg });


  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    route.params.subscribe((resp) => {
      this.appName = resp['appName'];

    });

    document.addEventListener("keydown", (event: any) => {
      console.log(event.keyCode);
      this.subject.next(JSON.parse(JSON.stringify({ key: event.keyCode })));
    });

    document.addEventListener("mousemove", (event: any) => {
      if (this.isBegin) {
        this.subject.next(JSON.parse(JSON.stringify({ mouse: [event.movementX, event.movementY] })));
      }
    });

    document.addEventListener("mousedown", (event: any) => {
      this.subject.next(JSON.parse(JSON.stringify({ click: event.buttons })));
    });

    document.addEventListener("wheel", (event: any) => {
      this.subject.next(JSON.parse(JSON.stringify({ wheel: event.deltaY / -100 })));

    });

    this.subject.next(JSON.parse(JSON.stringify({ open: this.appName })));

    this.subject.subscribe(
      async (msg) => {
        this.base64data = sanitizer.bypassSecurityTrustUrl(await this.convertBase(msg.data) + "");

      },
    );

  }



  convertBase(blob: Blob) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    })
  }

  Begin() {
    document.getElementsByTagName("html")[0].requestFullscreen();
    this.isBegin = true;
  }

  ngOnInit(): void {
  }


}
