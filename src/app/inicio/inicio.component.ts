import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  titulo = "IoT en la agricultura";
  cont= "La IoT con sus tecnologías permiten hacer el monitoreo y control de las variables temperatura y humedad para permitir aumentar la productividad y la capacidad de adaptación al cambio climático.";
  img="https://agriculturers.com/wp-content/uploads/2018/01/agriculture-IoT.jpg";
  cont1="Las tecnologías de IoT podrían transformar el sector, contribuyendo a la seguridad alimentaria y la reducción de los insumos agrícolas lo cual se traduce en reducción de costos de producción y tecnificación de cultivos.";
  img1="https://consaborcooperativo.net/wp-content/uploads/2019/01/agricultura-inteligente-40.png";
  constructor() { }

  ngOnInit(): void {
  }

}
