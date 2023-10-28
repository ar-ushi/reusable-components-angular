import { Component, ElementRef} from '@angular/core';

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {
 tooltip: string = '';
 position: 'above' | 'below' | 'right' | 'left' = 'below';
 left = 0;
 top = 0;
 color : string = 'black';
 duration? : number = 5000;
 transition? : 'fade-in' | 'fade-out' | 'none' = 'none';
 tooltipStyles: any[] = [];

  constructor(private el : ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.setProperty('--tooltip-background-color', this.color);
    this.position && this.tooltipStyles.push(`tooltip--${this.position}`);
    this.transition && this.tooltipStyles.push(`tooltip--${this.transition}`);
     this.duration != 1 && this.tooltipStyles.push('tooltip--fade-out')

  }
}
