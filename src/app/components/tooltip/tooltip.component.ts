import { Component, ElementRef} from '@angular/core';

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
 color : string = 'black';
  constructor(private el : ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.setProperty('--tooltip-background-color', this.color);
  }
}
