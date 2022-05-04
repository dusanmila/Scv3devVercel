import { Injectable } from '@angular/core';

export interface ObjectInfo {
  assortmentModule: string;
  gainings12Mrsd: number;
  wdpercentSerbia: number;
  wdpercentSector: number;
  wdpercentCustomer: number;
  gainingsVs12mpercent: number;
  registersNumber: number;
  shelfSpaceM: number;
  companyShelfSpaceM: number;
  companyShelfSpacePercent: number;
}

@Injectable({
  providedIn: 'root'
})
export class ObjectInfoService {

  constructor() { }
}
