import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { sharedModule } from '../../shared/shared.module';
import { BarcodeComponent } from './barcode/barcode.component';
import { WarrantyComponent } from './warranty/warranty.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { UnitsComponent } from './units/units.component';
import { VarriantAttributesComponent } from './varriant-attributes/varriant-attributes.component';





@NgModule({
  declarations: [
    InventoryComponent,
    BarcodeComponent,
    WarrantyComponent,
    BrandListComponent,
    UnitsComponent,
    VarriantAttributesComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    sharedModule,
  ]
})
export class InventoryModule { }
