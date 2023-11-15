import { Component, TemplateRef, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chip, [chip], chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent {
  private _closeable : boolean  = false;
  /* Text inside chip should default to text inside app-chip component/directive*/
  @Input() color? : string | undefined;
  @Input() 
  public set closeable(val : string | boolean){
    this._closeable = (typeof(val) === 'string' || val === true) ? true : false;
  }
  
}
