import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatM'
})
export class DateFormatPipeM implements PipeTransform {

  transform(value: any, format: string = 'fullDate'): string {
    // Asume que value es del tipo { seconds: number, nanoseconds: number }
    if (!value || value.seconds === undefined) {
      return 'Invalid Date';
    }

    // Convierte el timestamp a milisegundos y crea un objeto Date
    const date = new Date(value.seconds * 1000);
    
    // Formatear según el formato deseado
    let options: Intl.DateTimeFormatOptions;
    switch (format) {
      case 'month':
        options = { month: 'long' };
        break;
      default:
        options = { year: 'numeric', month: 'long', day: 'numeric' };
    }
    
    // Formatea la fecha utilizando las opciones
    return date.toLocaleDateString('es-ES', options);
  }
}