import { ComponentRef, Directive, ElementRef, HostListener, Input, ViewContainerRef} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {

  @Input() tooltip = '';
  @Input() position: 'above' | 'below' | 'right' | 'left' =  'below';
  @Input() color : string = 'black'; //default color for tooltip will be black
  @Input() transition? : 'fade-in' | 'fade-out' | 'none' = 'none';
  @Input() duration? : number = undefined; //setting default as 1ms
  private componentRef: ComponentRef<TooltipComponent> | null = null;
  private componentPool : ComponentRef<TooltipComponent>[] = []; //component pool only for tooltip events

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
    if (this.componentPool.length <= 0){
      this.createAndAttachTooltip();
    } else {
        this.componentRef = this.componentPool.pop()!;
        this.setTooltipProperties()
    }
  }

  private setTooltipProperties(){
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.tooltip;
      this.componentRef.instance.position = this.position;
      this.componentRef.instance.color = this.color;
      this.componentRef.instance.duration= this.duration;
      this.componentRef.instance.transition = this.transition;
      this.setPositionTooltip(this.componentRef.instance.position);
      this.closeTooltip(this.componentRef.instance.duration!);
    }
  }

closeTooltip(time : number){
  if (time != undefined){
    setTimeout(() => {
      this.pushAndHideTooltip();}, time)
  }
}

  setPositionTooltip(pos : string){
    const {left, right, top, bottom} = this.elementRef.nativeElement.getBoundingClientRect();
    switch (pos) {
      case 'below' :
      {
        this.componentRef!.instance.left = Math.round((left + (right-left)/2));
        break;
      }
      case 'above' : {
          this.componentRef!.instance.left = Math.round(left +(right-left)/2);
          this.componentRef!.instance.top = Math.round(top);
          break;
      }
      case 'right' :{
        this.componentRef!.instance.left = Math.round(right);
        this.componentRef!.instance.top = Math.round(top + (bottom - top) / 2);
        break;
      }
      case 'left' :{
        this.componentRef!.instance.left = Math.round(left);
        this.componentRef!.instance.top = Math.round(top + (bottom - top) / 2);
        break;
      }
    }

  }

@HostListener('mouseleave') 
  onMouseLeave() : void {
    this.pushAndHideTooltip();
}

pushAndHideTooltip() {
  if (this.componentRef !== null) {
    if (this.componentPool.length < 10){
      // Place the component back in the pool
      this.componentRef.instance.tooltip = '';
      this.componentPool.push(this.componentRef);
    }
      this.componentRef = null; // Reset the reference 
}
}
createAndAttachTooltip() {
  this.componentRef = this.viewContainerRef.createComponent(TooltipComponent);
  this.setTooltipProperties();
  this.componentRef.changeDetectorRef.detectChanges();
}

  ngOnDestroy() : void {
    this.destroy(); // prevent memoryleaks
  }

  destroy() : void {
    if (this.componentRef !== null){
      this.viewContainerRef.detach(this.viewContainerRef.indexOf(this.componentRef.hostView));
      this.componentRef.destroy();
      this.componentRef = null; //reinitalize for next instance
    }
  }
}

