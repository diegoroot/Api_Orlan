import { Component, OnInit } from '@angular/core';
import { ChartsModule} from 'ng2-charts';
import { RegistrosService} from '../servicios/registros.service';
@Component({
  selector: 'app-unico',
  templateUrl: './unico.component.html',
  styleUrls: ['./unico.component.css']
})
export class UnicoComponent implements OnInit {

  public doughnutChartLabels:any;
  public doughnutChartData:any;
  public doughnutChartType:any;
  temperature= 0;
  humidity=0;
  data1 = [];
  lista:any;
  public chartColors: any[] = [
    { 
      backgroundColor:["#6FC8CE","#FF7360" , "#FAFFF2", "#FFFCC4", "#B9E8E0"] 
    }];

  constructor(private registro: RegistrosService) {
    this.registro.getData().subscribe(
      (data) => {
        this.lista = data;
        console.log(this.lista[0]);
        this.data1.push(this.lista[0]['Reg_Hum']);
        this.data1.push(this.lista[0]['Reg_Tem']);
      },
      (error) => {
        console.error(error);
      }
    );
    console.log(this.data1);
    this.doughnutChartLabels = ['Humedad', 'Temperatura'];
    this.doughnutChartData = this.data1;
    this.doughnutChartType= 'doughnut';
   }

  ngOnInit(): void {
  }

}
