import { Component, OnInit} from '@angular/core';
import {faHorseHead} from '@fortawesome/free-solid-svg-icons'
import { UtilsService } from '../../utils.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  
})
export class SidenavComponent{

faHorseHead = faHorseHead;
changeColor :number[] = [0];
activeLi : HTMLLIElement;
bgColorOnClick : string = "rgb(180, 121, 203)";
bgColorOnMouseLeave : string = "#eee";
colorOnClick : string = "#F5F1F0"


  menu : Object[] = [
    { name:"Calendrier", icon:"calendar_month"},
    { name:"Contacts", icon:"mail"},
    { name:"Clients", icon:"account_circle"},
    { name:"Intervention", icon:"business_center"}
  ]

  constructor(private utilsService:UtilsService){

  }

  onMouseEnter(element:HTMLLIElement){
    if(element.style.backgroundColor !== "rgb(180, 121, 203)") {
      element.style.backgroundColor = "#eee"
    }
  }
  onMouseLeave(element:HTMLLIElement){
    if(element.style.backgroundColor !== "rgb(180, 121, 203)") {
      element.style.backgroundColor = "inherit"
    }
  }
      
  onClick(i:number) : void{
   this.changeColor.splice(0,1,i);
   this.utilsService.displayComponent.next({name:this.menu[i]['name'], display:true});
  }
  

}
