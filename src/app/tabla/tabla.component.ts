import { Component, OnInit } from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import { RegistrosService} from '../servicios/registros.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  Reg_Fec: string;
  Reg_Hum: number;
  Reg_Tem: number;
  Reg_Id: number;
}

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  lista:any;
  dataSource:any;
  displayedColumns: string[] = ['Reg_Fec', 'Reg_Hum', 'Reg_Tem', 'Reg_Id'];
  constructor(private userService: RegistrosService) {
    this.userService.getUsers()
    .subscribe(
      (data) => {
        this.lista = data;
        console.log(this.lista);
      },
      (error) => {
        console.error(error);
      }
    );
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.lista)
    

  }
  ngOnInit():void{
    
  }

}
