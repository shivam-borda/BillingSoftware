import { Component } from '@angular/core';
import { routes } from '../../../core/helpers/routes';

@Component({
  selector: 'app-tables-basic',
  templateUrl: './tables-basic.component.html',
  styleUrls: ['./tables-basic.component.scss'],
})
export class TablesBasicComponent {
  public routes = routes;
}
