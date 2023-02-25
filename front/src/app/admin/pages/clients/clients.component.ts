import {
  AfterViewInit,
  Component,
  Injectable,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import { Client } from 'src/app/shared/interfaces/client.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteClientComponent } from './dialog-delete-client/dialog-delete-client.component';

@Injectable()
export class MatPaginatorCustom extends MatPaginatorIntl {
  override itemsPerPageLabel: string = 'Elements par page';
  override lastPageLabel: string = 'Dernière page';
  override firstPageLabel: string = 'Première page';
  override previousPageLabel: string = 'Page précédente';
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit, AfterViewInit {
  constructor(
    private httpService: HttpClientService,
    public dialog: MatDialog
  ) {}

  dataSource: MatTableDataSource<Client> = new MatTableDataSource();
  displaySpinner: boolean = true;
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'horses', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.httpService.clients.subscribe(
      (clients: Client[]) => (this.dataSource.data = clients)
    );
    this.displaySpinner = false;
  }

  openDialog(client: Client) {
    this.dialog.open(DialogDeleteClientComponent, {
      data: client,
    });
  }
}
