import { ICliDirecciones } from './icli-direcciones.model';
import { ICliTelefonos } from './icli-telefonos.model';

export interface IEstudiante {
    id: number;
    nombre: string;
    apellido: string;
    edad: number;
    fechaDeNacimiento: Date;

    direcciones: ICliDirecciones[];
    telefonos: ICliTelefonos[];
}
