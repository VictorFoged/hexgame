import { Component } from '@angular/core';

export interface Hex {
  color: String
  location : HexPoint
}

export interface HexPoint {
  x : number
  y : number
}

export enum Color {
  Red,
  Blue,
  None
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hex-game';

  hexes : Hex[] = []
  hexgrid : number[][] = Array(11).fill(0).map(() => Array(11).fill(0));
  turn : number = 0;
  ngOnInit(){
    console.log(this.hexgrid)
    for (let i = 0; i < 18; i++) {
      this.hexes.push({color: 'white', location : {x: -1, y : -1}})
    }
    for (let i = 0; i < 12; i++) {
      this.hexes.push({color: 'blue', location : {x: -1, y : -1}})
    }
    for (let i = 0; i < 5; i++) {
      this.hexes.push({color: 'white', location : {x: -1, y : -1}})
    }
    for (let i = 0; i < 11; i++) {
      // preFill  = [0,0,1,1,2,2]
      for (let pre = 0; pre < Math.floor(i/2)+1; pre++) {
        if(Math.floor(i/2) == pre){
          this.hexes.push({color: 'red', location : {x: -1, y : -1}})
        }
        else {
          this.hexes.push({color: 'white', location : {x: -1, y : -1}})
        }
      }
      for (let [index, val] of this.hexgrid[i].entries()) {
        this.hexes.push({color: 'gray', location : {x: i, y : index}})
      }
      let postFill = [6,5,5,4,4,3,3,2,2,1,1]
      for (let post = 0; post < postFill[i]; post++) {
        if(post == 0){
          this.hexes.push({color: 'red', location : {x: -1, y : -1}})
        }
        else {
          this.hexes.push({color: 'white', location : {x: -1, y : -1}})
        }
      }
    }
    for (let i = 0; i < 5; i++) {
      this.hexes.push({color: 'white', location : {x: -1, y : -1}})
    }
    for (let i = 0; i < 12; i++) {
      this.hexes.push({color: 'blue', location : {x: -1, y : -1}})
    }
  }
  clickHex(hex : Hex){
    if(hex.location.x < 0 && hex.location.y < 0){
      return;
    }
    if(hex.color == 'red' || hex.color == 'blue'){
      return;
    }
    if(this.turn == 0){
      hex.color = 'red'
    }
    else if(this.turn == 1){
      hex.color = 'blue'
    }
    this.turn = (this.turn + 1) % 2

    console.log(this.hexesToHexGrid(this.hexes))
    
  }

  hexesToHexGrid(hexes : Hex[]){
    let hexgrid : number[][] = Array(11).fill(0).map(() => Array(11).fill(0));
    for (const [i, hex] of hexes.entries()) {
      if(hex.location.x < 0 && hex.location.y < 0){
        continue;
      }
      let player : number = 0
      if(hex.color == 'red'){
        player = 1
      }
      else if(hex.color == 'blue'){
        player = 2
      }
      hexgrid[hex.location.x][hex.location.y] = player;
    }
    return hexgrid
  }
}
