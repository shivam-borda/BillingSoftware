import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx'


import {
  DataService,
  pageSelection,
  apiResultFormat,
  routes,
  SidebarService,
} from '../../../../core/core.index';
import { categoryList } from '../../../../shared/model/page.model';
import { PaginationService, tablePageSize } from '../../../../shared/shared.index';
import Swal from 'sweetalert2';

interface data {
  value: string;
}

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  isAddCategoryModalOpen: boolean = false;
  initChecked = false;
  private isDataLoaded: boolean = true;
  public routes = routes;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public categoryname = '';

  // pagination variables
  public tableData: Array<any> = [];
  public tableData1: Array<any> = [];
  public pageSize = 4;
  public pazesize1 = this.pageSize
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<categoryList>;
  public searchDataValue = '';
  public PageNumber: number = 1
  searchResults: any[] = []
  userserch: boolean = false
  //** / pagination variables

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    private sidebar: SidebarService
  ) {
    this.data.getCategoryList().subscribe(
      (apiRes) => {

      }
    )
    this.data.getCategoryList1().subscribe((apiRes: any) => {
      this.totalData = apiRes.totalRecords;
      this.tableData1 = apiRes.data

    });
  }

  ngOnInit(): void {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.categoryList) {
        this.getTableData({ skip: res.skip, limit: res.skip + res.pageSize });
        this.pageSize = this.pazesize1;
      }
    });
  }

  private getTableData(pageOption: pageSelection = { skip: 0, limit: this.pageSize }): void {

    const startIndex = pageOption.skip;
    const endIndex = pageOption.skip + this.pageSize;

    if (this.pagechange) {
      this.data.getCategoryList1(this.PageNumber, this.pageSize, this.Ascendingrow, this.Ascending, '').subscribe((apiRes: any) => {
        this.tableData = apiRes.data.slice();
        this.totalData = apiRes.totalRecords;
        this.dataSource = new MatTableDataSource<categoryList>(this.tableData);
        this.pagination.calculatePageSize.next({
          totalData: this.totalData,
          pageSize: this.pageSize,
          tableData: this.tableData,
          serialNumberArray: this.serialNumberArray,
        });
        this.pagechange = false
        this.Ascending = 'arc'
      });
    } if (this.userserch) {
      this.data.getCategoryList1(undefined, undefined, this.Ascendingrow, this.Ascending, this.searchDataValue).subscribe((apiRes: any) => {
        console.log(apiRes.data);
        this.tableData = apiRes.data.slice();
        this.totalData = apiRes.totalRecords;
        this.dataSource = new MatTableDataSource<categoryList>(this.tableData);
        this.pagination.calculatePageSize.next({
          totalData: this.totalData,
          pageSize: this.pageSize,
          tableData: this.tableData,
          serialNumberArray: this.serialNumberArray,
        });
      });
    }
    if (this.isDataLoaded) {
      this.data.getCategoryList1(this.PageNumber, this.pageSize, this.Ascendingrow, this.Ascending, '').subscribe((apiRes: any) => {
        this.tableData = apiRes.data.slice(startIndex, endIndex);
        this.totalData = apiRes.totalRecords;
        this.dataSource = new MatTableDataSource<categoryList>(this.tableData);
        this.pagination.calculatePageSize.next({
          totalData: this.totalData,
          pageSize: this.pageSize,
          tableData: this.tableData,
          serialNumberArray: this.serialNumberArray,
        });
        this.isDataLoaded = false
      });
    } if (this.pagesizeis) {
      this.data.getCategoryList1(this.PageNumber, this.pageSize, this.Ascendingrow,  this.Ascending, '').subscribe((apiRes: any) => {
        this.tableData = apiRes.data.slice(startIndex, endIndex);
        this.totalData = apiRes.totalRecords;
        this.dataSource = new MatTableDataSource<categoryList>(this.tableData);
        this.pagination.calculatePageSize.next({
          totalData: this.totalData,
          pageSize: this.pageSize,
          tableData: this.tableData,
          serialNumberArray: this.serialNumberArray,
        });
      });
      this.pagesizeis = false
    }
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }


  public searchData(): void {
    if (this.searchDataValue === ''){
      this.userserch = false
      this.pagechange = true
      this.pagewaschanged = true
      this.getTableData()
    } else {
      this.pagewaschanged = false
      this.userserch = true
      this.getTableData()
    }
  }

  selectedList1: data[] = [
    { value: 'Sort by Date' },
    { value: 'Newest' },
    { value: 'Oldest' },
  ];

  public filter = false;

  openFilter() {
    this.filter = !this.filter;
  }

  isCollapsed: boolean = false;
  toggleCollapse() {
    this.sidebar.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }

  confirmColor() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: ' btn btn-success',
        cancelButton: 'me-2 btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        confirmButtonText: 'Yes, delete it!',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
  }

  selectedList2: data[] = [
    { value: 'Choose Category' },
    { value: 'Laptop' },
    { value: 'Electronics' },
  ];

  selectedList3: data[] = [
    { value: 'Choose Status' },
    { value: 'Active' },
    { value: 'Inactive' },

  ];

  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }

  public editname: any = ""
  editvalue(value: any) {
    this.editname = value
  }

  createCategory() {
    this.data.postCategory(this.categoryname).subscribe(
      (apiRes) => {
        console.log(apiRes);
        this.data.getCategoryList1().subscribe((apiRes: any) => {
          this.totalData = apiRes.totalRecords;
          this.tableData1 = apiRes.data;
          this.getTableData({ skip: 0, limit: this.pageSize });
        });
      },
    );
  }

  generatePDF() {
    const doc: any = new jsPDF();
    const tableBody = this.tableData1.map(item => [item.id, item.name, item.createdAt, item.isActive ? 'Active' : 'Inactive']);
    doc.autoTable({
      head: [['ID', 'Name', 'Created At', 'Status']],
      body: tableBody
    });
    doc.save('category-list.pdf');
  }

  filename = "category-list.xlsx"

  exportexls() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tableData1)
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1')
    XLSX.writeFile(wb, this.filename)
  }

  printPage() {
    window.print();
  }

  refreshWindow() {
    window.location.reload();
  }

  pagechange = false
  pagewaschanged = false


  receiveMessage($event: any) {
    this.userserch = false
    this.PageNumber = $event
    this.pagechange = true
    this.pagewaschanged = true
    this.pagesizewaschanged = false
  }

  pagesizeis: boolean = false
  pagesizewaschanged = false

  recivepazesize(event: any) {
    this.pagesizeis = true
    this.pageSize = event;
    this.pazesize1 = event;
    this.pagewaschanged = false
    this.pagesizewaschanged = true
    this.getTableData();
  }

  isAscending: boolean = true
  Ascending: any = 'arc'
  Ascendingrow = 0

  SortDir(row: number) {
    this.Ascendingrow = row
    if (this.isAscending) {
      this.Ascending = 'arc'
      this.isAscending = false
    } else {
      this.Ascending = 'desc'
      this.isAscending = true
    }
    
    if (this.pagewaschanged) {
      this.receiveMessage(this.PageNumber)
    }

    if (this.pagesizewaschanged) {
      this.recivepazesize(this.pageSize)
    }

    if (!this.pagewaschanged && !this.pagesizewaschanged && !this.userserch) {
      this.isDataLoaded = true
    }

    this.getTableData()
  }

}
