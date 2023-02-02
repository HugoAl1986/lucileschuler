import { Component} from '@angular/core';
import {faHorseHead} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  
})
export class SidenavComponent{

faHorseHead = faHorseHead;
changeColor :number[] = [0]

  menu : Object[] = [
    { name:"Calendrier", icon:"calendar_month"},
    { name:"Contacts", icon:"mail"},
    { name:"Clients", icon:"account_circle"},
    { name:"Intervention", icon:"business_center"}
  ]
      
  onClick(i:number) : void{
   this.changeColor.splice(0,1,i);
  }
  

}
