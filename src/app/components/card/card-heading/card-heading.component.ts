import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-heading',
  templateUrl: './card-heading.component.html',
  styleUrls: ['./card-heading.component.scss']
})
export class CardHeadingComponent {
 @Input() Color : string = '';
 @Input() Title : string = '';
 @Input() Subtitle?: string = '';
 
}
