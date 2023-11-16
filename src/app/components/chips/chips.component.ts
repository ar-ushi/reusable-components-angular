import { Component, Input, EventEmitter, Output, AfterViewInit, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Colors } from 'src/app/common-behaviors/colors';
import { createColorObject } from 'src/app/common-behaviors/common-methods';

@Component({
  selector: 'app-chip, [chip], chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements AfterViewInit{
  _closeable : boolean  = false;
  isVisible : boolean = true;
  private colors : Colors;
  /* Text inside chip should default to text inside app-chip component/directive*/
  @Input() color? : string;
  @Input() bgcolor? : string;
  @Input() fill :  'clear' | 'outline' | 'solid' = 'solid'
  @Input() 
  public set closeable(val : string | boolean){
    this._closeable = (typeof(val) === 'string' || val === true) ? true : false;
  }
  @Input() closeIconSrc? : string = '';
  @Output() closeChip: EventEmitter<any> = new EventEmitter();

  constructor(public _elementRef : ElementRef){  
    this.colors  = new Colors(_elementRef);
  }
  onCloseChip(){
    this.isVisible = false;
    this.closeChip?.emit();
  }

  ngAfterViewInit(): void {
    this.colors.addColors(createColorObject(this.bgcolor!, this.color!, this.fill));
  }
}
