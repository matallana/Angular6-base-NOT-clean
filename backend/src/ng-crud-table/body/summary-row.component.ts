import {
  Component, OnInit, Input, HostBinding, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef
} from '@angular/core';
import {DataTable} from '../base/data-table';
import {Subscription} from 'rxjs';
import {translate} from '../base/util';
import {Row} from '../types';

@Component({
  selector: 'app-datatable-summary-row',
  templateUrl: './summary-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryRowComponent implements OnInit, OnDestroy {

  @Input() public table: DataTable;
  @Input() public row: Row;

  private subscriptions: Subscription[] = [];

  @HostBinding('class')
  get cssClass() {
    const cls = 'datatable-body-row datatable-group-row';
    return cls;
  }

  @HostBinding('style.height.px')
  get rowHeight(): number {
    return this.table.dimensions.rowHeight;
  }

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.table.settings.columnResizeMode === 'aminated') {
      const subColumnResize = this.table.dataService.resizeSource$.subscribe(() => {
        this.cd.markForCheck();
      });
      this.subscriptions.push(subColumnResize);
    }
    const subColumnResizeEnd = this.table.dataService.resizeEndSource$.subscribe(() => {
      this.cd.markForCheck();
    });
    const subRows = this.table.dataService.rowsChanged$.subscribe(() => {
      this.cd.markForCheck();
    });
    const subScroll = this.table.dataService.scrollSource$.subscribe(() => {
      this.cd.markForCheck();
    });
    this.subscriptions.push(subColumnResizeEnd);
    this.subscriptions.push(subRows);
    this.subscriptions.push(subScroll);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  stylesByGroup() {
    return translate(this.table.offsetX, 0);
  }

}
