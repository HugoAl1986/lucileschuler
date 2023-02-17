import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import {Client} from 'src/app/shared/interfaces/client.interface';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{

  constructor(private httpService:HttpService){

  }
  
  
  
  ngOnInit(): void{
      this.httpService.getClients().subscribe({
        next: (datas:Client[]) => console.log(datas),
        error : (data:string) => console.log(data)  
      })
  }

}
