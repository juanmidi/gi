import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IEstudiante } from 'src/app/models/iEstudiante';
import { Subscription, Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from 'src/app/models/mat-paginator-intl-cro';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }]
})
export class EstudiantesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  estudiantes: MatTableDataSource<IEstudiante>;
  _estudiantes: {};
  subRef$: Subscription;
  displayedColumns: string[] = ['nombre', 'apellido'];
  cargando = true;
  
  public keyword = "apellido";



  constructor(private dataService: DataService,
              private router: Router) {}

  ngOnInit(): void {
    const url = environment.urlAPI + 'curso_apirest_YT/estudiantes?page=1';
    this.subRef$ = this.dataService.get<IEstudiante[]>(url)
      .subscribe(res => {
        this.cargando = false;
        this.estudiantes = new MatTableDataSource<IEstudiante>(res.body);
        this.estudiantes.paginator = this.paginator;
        this.estudiantes.sort = this.sort;
        this._estudiantes=res.body;
        console.log(this._estudiantes);
      },
        err => {
          console.log('Error al recuperar los estudiantes', err);
        });



 
  }

  editar(e) {
    console.log('Fila a editar', e);
    // this.router.navigate(['/cliedit', e.id]);
  }
  borrar(estudiante: IEstudiante) {
  
  }

  agregar() {
    // this.router.navigate(['/cliadd']);
  }


}
