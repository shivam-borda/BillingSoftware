import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomPaginationComponent } from './custom-pagination.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [CustomPaginationComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,MatSelectModule],
  exports: [CustomPaginationComponent],
})
export class CustomPaginationModule {}
