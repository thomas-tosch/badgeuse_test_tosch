import { Injectable } from '@angular/core';



export const enum StatusColors {
  NON_JUSTIFIED = 'rgba(255, 99, 132, 0.5)',
  PRESENT =       'rgba(50, 205, 50, 0.5)',
  JUSTIFIED_STAGE = 'rgba(30, 144, 255, 0.5)',
  JUSTIFIED_HILLNESS = 'rgba(135, 206, 250, 0.5)',
  JUSTIFIED_OTHER = 'rgba(0, 191, 255, 0.5)'
}




@Injectable({
  providedIn: 'root'
})
export class StatusColorHandlerService {

  statusNameToColorMapping = new Map<string, StatusColors>();

  constructor() {
    this.statusNameToColorMapping.set('malade', StatusColors.JUSTIFIED_HILLNESS);
    this.statusNameToColorMapping.set('stage', StatusColors.JUSTIFIED_STAGE);
    this.statusNameToColorMapping.set('alternance', StatusColors.JUSTIFIED_STAGE);
    this.statusNameToColorMapping.set('autre raison', StatusColors.JUSTIFIED_OTHER);
    this.statusNameToColorMapping.set('non justifiee', StatusColors.NON_JUSTIFIED);
    this.statusNameToColorMapping.set('non justifiees', StatusColors.NON_JUSTIFIED);
    this.statusNameToColorMapping.set('present', StatusColors.PRESENT);
    this.statusNameToColorMapping.set('présent', StatusColors.PRESENT);
  }


  /**
   * get the color associated to a given status. NOTA : the process is case and accent unsensitive
   * @param statusName : the name of the status requested
   */
  getStatusColorFromStatusName(statusName: string): StatusColors {

    //sanitize the string
    var cleanName = statusName.toLowerCase();
    cleanName = cleanName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return this.statusNameToColorMapping.get(cleanName);
  }

  /**
   * get the list of all handled status names
   */
  getStatusList(): Iterable<string> {
    return this.statusNameToColorMapping.keys();
  }
}
