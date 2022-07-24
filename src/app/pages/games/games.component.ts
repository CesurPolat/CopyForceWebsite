import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  array=[1,2];

  games:any;

  toggleGameDesc=false;

  selectedIndex:number | undefined;
  selectedData:any;

  constructor(private http:HttpClient) { 
    this.http.get("http://localhost:8080/api/Apps").subscribe((resp:any)=>{
      this.games=resp.data;
      console.log(resp);
      
    });
  }

  toggleGame(){
    this.toggleGameDesc=!this.toggleGameDesc;

  }

  changeSelectedIndex(i:number){
    this.selectedIndex=i;
    this.selectedData=this.games[i];
  }

  ngOnInit(): void {
  }

}
