import { Component, ElementRef, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chip, [chip]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent {
  /* Text inside chip should default to text inside app-chip component/directive*/

}
