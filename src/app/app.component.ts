import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DbService } from './service/db.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface Customers {
  CUSNO: number;
  CNAME: string;
  CCITY: string;
  CSTATE: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns = ['CUSNO', 'CNAME', 'CCITY', 'CSTATE'];
  dataSource = new MatTableDataSource<Customers>();

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private dbService: DbService){
    // this.dataSource.data = [
    //   {CUSNO:5, CNAME:'david', CCITY:'Musterhausen', CSTATE:'BW'},
    //   {CUSNO:3, CNAME:'mike', CCITY:'Musterhausen', CSTATE:'BW'},
    //   {CUSNO:4, CNAME:'karl-otto', CCITY:'Musterhausen', CSTATE:'BW'},
    //   {CUSNO:6, CNAME:'Max', CCITY:'Musterhausen', CSTATE:'BW'}
    // ];
    
  }
  ngOnInit(): void {   
    this.dbService.customers.subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
