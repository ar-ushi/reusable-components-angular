import { Component, Input, EventEmitter, Output, OnDestroy, ComponentRef} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chip, [chip], chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnDestroy{
  _closeable : boolean  = false;
  /* Text inside chip should default to text inside app-chip component/directive*/
  private componentRef: ComponentRef<ChipsComponent> | null = null;
  @Input() color? : string | undefined;
  @Input() 
  public set closeable(val : string | boolean){
    this._closeable = (typeof(val) === 'string' || val === true) ? true : false;
  }
  @Input() closeIconSrc? : string = '';
  @Output() closeChip: EventEmitter<any> = new EventEmitter();

  constructor(){}

  onCloseChip(){
    this.closeChip?.emit();
    this.ngOnDestroy;
  }

  ngOnDestroy(){
    this.componentRef?.destroy();
  }
}
