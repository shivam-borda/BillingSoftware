import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  pageSelection,
  pageSize,
  pageSizeCal,
  PaginationService,
} from './pagination.service';
import { DataService } from '../../core/core.index';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss'],
})
export class CustomPaginationComponent implements OnInit {

  @Input() message: any
  @Output() messageEvent = new EventEmitter<number>();
  @Output() pagesize = new EventEmitter<any>();

  public pageSize = 10;
  public tableData: Array<string> = [];
  // pagination variables
  public lastIndex = 0;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  numbers: number[] = [3, 4, 5, 10, 15, 20];
  selectedNumber: number | any = null;


  //** / pagination variables

  constructor(private pagination: PaginationService, public data: DataService) {
    this.tableData = [];
    this.pagination.calculatePageSize.subscribe((res: pageSizeCal) => {
      this.calculateTotalPages(
        res.totalData,
        res.pageSize,
        res.tableData,
        res.serialNumberArray
      );
      this.pageSize = res.pageSize;
    });
    this.pagination.changePagesize.subscribe((res: pageSize) => {
      this.changePageSize(res.pageSize);
    });
  }

  ngOnInit(): void {
    this.limit = this.message
  }




  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.messageEvent.emit(this.currentPage);
      this.pageIndex = this.currentPage - 1;
      if (this.currentPage === this.totalPages) {
        this.limit = this.totalData;
      } else {
        this.limit += this.pageSize;
      }
      this.skip = this.pageSize * this.pageIndex;
      this.pagination.tablePageSize.next({
        skip: this.skip,
        limit: this.limit,
        pageSize: this.pageSize,
      });
    } else if (event == 'previous') {
      this.currentPage--;
      this.messageEvent.emit(this.currentPage);
      this.pageIndex = this.currentPage - 1;
      if (this.limit - this.pageSize < 0) {
        this.limit = this.pageSize;
      } else {
        this.limit = this.currentPage * this.pageSize;
      }
      this.skip = this.pageSize * this.pageIndex;
      this.pagination.tablePageSize.next({
        skip: this.skip,
        limit: this.limit,
        pageSize: this.pageSize,
      });
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.messageEvent.emit(pageNumber)
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    // this.getTableData();
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
    if (pageNumber === this.totalPages) {
      this.limit = this.totalData; // Set limit to totalData
    } else {
      this.limit = this.pageSize * pageNumber; // Calculate limit based on page number
    }
  }

  public changePageSize(pageSize: number): void {
    this.pageSelection = [];
    this.limit = pageSize;
    this.skip = 0;
    this.currentPage = 1;
    // this.getTableData();
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
  }

  public calculateTotalPages(
    totalData: number,
    pageSize: number,
    tableData: Array<string>,
    serialNumberArray: Array<number>
  ): void {
    this.tableData = tableData;
    this.pageNumberArray = [];
    this.serialNumberArray = serialNumberArray;
    this.totalData = totalData;
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }

  onSelectpazesize() {
    this.pagesize.emit(this.selectedNumber)
    const previousPageSize = this.pageSize;
    const previousSkip = this.skip;
    this.pageSize = this.selectedNumber;
    this.skip = Math.floor(previousSkip / previousPageSize) * this.pageSize;
    this.limit = this.skip + this.pageSize;
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
  }

  selectedList2: any[] = [
    { value: '1' },
    { value: '2' },
    { value: '3' },
  ];

  SelectedNumber() {
    this.pagesize.emit(this.selectedNumber)
    const previousPageSize = this.pageSize;
    const previousSkip = this.skip;
    this.pageSize = this.selectedNumber;
    this.skip = Math.floor(previousSkip / previousPageSize) * this.pageSize;
    this.limit = this.skip + this.pageSize;
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
  }


}
