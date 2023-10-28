import { Component} from '@angular/core';

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {
 tooltip: string = '';
 hideTooltip: boolean = false;
 position: 'above' | 'below' | 'right' | 'left' | 'default' = 'default';
 left = 0;
 top = 0;
  constructor() {}

  ngOnInit() : void {}
}
