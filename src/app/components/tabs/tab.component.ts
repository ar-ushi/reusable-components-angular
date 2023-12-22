import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
})
export class TabComponent {
  _oveflow: boolean = false;
  @Input() key:string = 'one';
  @Input() label:string = '';
  @Input() active
  @Input()
  private set overflow(val: string|boolean){
    this._oveflow = (typeof(val) === 'string' || val === true) ? true : false;
  }

  constructor(){}

  
}
