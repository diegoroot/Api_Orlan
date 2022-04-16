import { Component, OnInit } from '@angular/core';
import { RegistrosService} from '../servicios/registros.service';
import {Chart} from 'node_modules/chart.js';
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {
  data: {};
  options: any;
  themeSubscription: any;
  col: string[]=[];
  temp: string[] =[];
  hum:string[]=[];
  lista: any;

  constructor(private serv: RegistrosService) { 
    this.serv.getData1()
      .subscribe(
        (data) => {
          this.lista = data;
          for(let dato of this.lista){
            this.col.push(dato['Reg_Fec']);
            this.temp.push(dato['Reg_Tem']);
            this.hum.push(dato['Reg_Hum']);
          }
          //console.log(data[0]['Reg_Fec'])
        },
        (error) => {
          console.error(error);
        }
      );
  }

  ngOnInit(): void {
    var barChartData = {
      labels: this.col,
      datasets: [{
        type: 'line',
        label: 'Temperatura',
        id: "y-axis-0",
        backgroundColor: "rgba(51,51,51,0.5)",
        data: this.temp
      }, {
        type: 'line',
        label: 'Humedad',
        id: "y-axis-1",
        backgroundColor: "rgba(151,187,205,0.5)",
        data: this.hum
      }]
    };
    console.log("hola");
    
    var ctx = document.getElementById("grafica");
    // allocate and initialize a chart
    var ch = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        title: {
          display: true,
          text: "Últimos 4 registros"
        },
        tooltips: {
          mode: 'label'
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true,
            position: "left",
            id: "y-axis-0",
          }, {
            stacked: false,
            position: "right",
            id: "y-axis-1",
          }]
        }
      }
    });
  }

}
