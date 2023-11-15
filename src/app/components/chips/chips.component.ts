import { Component, Input, EventEmitter, Output, OnDestroy, ComponentRef, ViewContainerRef} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chip, [chip], chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent{
  _closeable : boolean  = false;
  isVisible : boolean = true;
  /* Text inside chip should default to text inside app-chip component/directive*/
  @Input() color? : string | undefined;
  @Input() 
  public set closeable(val : string | boolean){
    this._closeable = (typeof(val) === 'string' || val === true) ? true : false;
  }
  @Input() closeIconSrc? : string = '';
  @Output() closeChip: EventEmitter<any> = new EventEmitter();

  constructor(){}

  onCloseChip(){
    this.isVisible = false;
    this.closeChip?.emit();
  }
}
