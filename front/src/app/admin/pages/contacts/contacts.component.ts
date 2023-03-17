import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { ContactMail } from 'src/app/shared/interfaces/contactMail.interface';
import { BehaviourService } from 'src/app/shared/services/behaviour.service';

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
  displayedColumns: string[] = ['email','nom','prenom','titre', 'messageLu', 'actions'];
  checked:boolean=false;

  ngOnInit(): void {
    this.behaviourService.contactsMail.subscribe(
      (contactsMail: ContactMail[]) => {
        this.dataSource = new MatTableDataSource<ContactMail>(contactsMail); 
      }
    );
  }

  onCheckBoxClick(data:boolean) : void{
    data ? this.dataSource.filter="false" : this.dataSource.filter='';
  }
}
