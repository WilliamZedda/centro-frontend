import { Pipe, PipeTransform } from '@angular/core';
import { Alert } from 'src/app/_models/alert';

@Pipe({
  name: 'alertsFilter'
})
export class AlertsFilterPipe implements PipeTransform {
  transform(alertArray: Alert[], searchText: string): Alert[] {
    if (!alertArray || !searchText) {
      return alertArray;
    }
    return alertArray.filter(alert => alert.description.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }

}
