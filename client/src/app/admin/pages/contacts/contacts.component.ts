import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { combineAll, concat, concatAll, concatMap, concatWith, forkJoin, map, of, tap, zip } from 'rxjs';
import { ContactMailResponse } from 'src/app/shared/interfaces/contact-mail-response.interface';
import { ContactMail } from 'src/app/shared/interfaces/contactMail.interface';
import { BehaviourService } from 'src/app/shared/services/behaviour.service';
import { ContactMailResponseService } from 'src/app/shared/services/contact-mail-response.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  constructor(private behaviourService: BehaviourService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  dataSource:MatTableDataSource<ContactMail>;
  displayedColumns: string[] = ['email','date','nom','prenom','titre', 'messageLu','contactMailResponse','actions'];
  checked:boolean;
  contactMailResponse:ContactMailResponse[];

  ngOnInit(): void {
    this.behaviourService.contactsMail.subscribe((data)=>console.log(data));
    this.behaviourService.contactsMail.subscribe(
      (contactsMail: ContactMail[]) => {  
        this.dataSource = new MatTableDataSource<ContactMail>(contactsMail); 
        this.dataSource.filter="false";
      }
    );
  }

  onCheckBoxClick(data:boolean) : void{
    data ? this.dataSource.filter = "true" : this.dataSource.filter="false"; 
  }
}
