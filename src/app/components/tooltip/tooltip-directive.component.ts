import { ComponentRef, Directive, ElementRef, HostListener, Input, ViewContainerRef} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective{

  @Input() tooltip = '';
  @Input() hideTooltip? : boolean | undefined = false;
  @Input() position: 'above' | 'below' | 'right' | 'left' | 'default' = 'default';
  private componentRef: ComponentRef<any> | null = null;

  constructor(
	private elementRef: ElementRef,
  public viewContainerRef : ViewContainerRef
  ) {
  }

  //listener for onhover 
  @HostListener('mouseenter')
  onHover() : void {
    this.initializeToolTip();
  }

  private initializeToolTip() {
    //check if componentRef exists i.e does tooltip component exist - if not, instantiate it
    if (this.componentRef === null){
      this.componentRef = this.viewContainerRef.createComponent(TooltipComponent);
      this.setTooltipProperties();
      this.componentRef.changeDetectorRef.detectChanges();
    } else {
      if (this.componentRef !== null) {
        this.componentRef.instance.hideTooltip = false; 
      }
    }
  }

  private setTooltipProperties(){
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.tooltip;
      this.componentRef.instance.position = this.position;
      const {left, right, top, bottom, height} = this.elementRef.nativeElement.getBoundingClientRect();
      console.log(this.elementRef.nativeElement.getBoundingClientRect())
      //include logic for setting position - two ways : set class 
      switch (this.componentRef.instance.position) {
        case 'below' :{
          this.componentRef.instance.left = Math.round((left + (right-left)/2));
          break;
        }
        case 'above' : {
            this.componentRef.instance.left = Math.round(left +(right-left)/2);
            this.componentRef.instance.top = Math.round(top);
            break;
        }
        case 'right' :{
          this.componentRef.instance.left = Math.round(right);
          this.componentRef.instance.top = Math.round(top + (bottom - top) / 2);
          break;
        }
        case 'left' :{
          this.componentRef.instance.left = Math.round(left);
          this.componentRef.instance.top = Math.round(top + (bottom - top) / 2);
          break;
        }
        case 'default' : {
          break;
        }
      }
    }
  }

  /*@HostListener('mouseleave') 
  onMouseLeave() : void {
    if (this.componentRef !== null) {
    this.componentRef.instance.hideTooltip = true; 
    }
  }*/

  ngOnDestroy() : void {
    this.destroy(); //remove tooltip when host comp destroyed to prevent memoryleaks
  }

  destroy() : void {
    if (this.componentRef !== null){
      this.viewContainerRef.detach(this.viewContainerRef.indexOf(this.componentRef.hostView));
      this.componentRef.destroy();
      this.componentRef = null; //reinitalize for next instance
    }
  }
}

