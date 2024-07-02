import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any): string {
    // Crea un nuevo objeto de fecha a partir del timestamp
    if (!value || value.seconds === undefined) {
      return 'Invalid Date';
    }

    // Convierte el timestamp a milisegundos y crea un objeto Date
    const date = new Date(value.seconds * 1000);
    // Opciones de formato de fecha
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    // Formatea la fecha utilizando las opciones
    return date.toLocaleDateString('es-ES', options);
  }
}