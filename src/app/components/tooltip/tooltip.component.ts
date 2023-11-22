import { AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import { BaseClass } from 'src/app/common-behaviors/base';
import { Colors } from 'src/app/common-behaviors/colors';
import { createColorObject } from 'src/app/common-behaviors/common';

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, AfterViewInit {
 tooltip: string = '';
 position: 'above' | 'below' | 'right' | 'left' = 'below';
 left = 0;
 top = 0;
 color?: string;
 bgcolor?:string;
 duration? : number = 5000;
 transition? : 'fade-in' | 'fade-out' | 'none';
 tooltipStyles: any[] = [];
 styles : BaseClass;
  
constructor(private el : ElementRef) {
  this.styles  = new BaseClass( new Colors(el));
}

  ngOnInit() {
    this.position && this.tooltipStyles.push(`tooltip--${this.position}`);
    this.transition && this.tooltipStyles.push(`tooltip--${this.transition}`);
    this.duration != undefined && this.tooltipStyles.push('tooltip--fade-out'); 
  }

  ngAfterViewInit(): void {
    this.styles.colors.addColors(createColorObject(this.bgcolor!, this.color!));
  }
}
