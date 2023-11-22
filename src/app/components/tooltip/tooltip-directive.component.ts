import { ComponentRef, Directive, ElementRef, HostListener, Input, ViewContainerRef} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {

  @Input() tooltip = '';
  @Input() position?: 'above' | 'below' | 'right' | 'left' =  'below';
  @Input() ttcolor? : string ='white';
  @Input() ttbgcolor?: string = 'black';
  @Input() transition? : 'fade-in' | 'fade-out' | 'none' = 'none';
  @Input() duration? : number;
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
        this.setTooltipProperties();
      }
    this.closeTooltip(this.componentRef!.instance.duration!);
  }

  private setTooltipProperties(){
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.tooltip;
      this.componentRef.instance.position = this.position;
      this.componentRef.instance.color = this.ttcolor;
      this.componentRef.instance.bgcolor = this.ttbgcolor;
      this.componentRef.instance.duration= this.duration;
      this.componentRef.instance.transition = this.transition;
      this.setPositionTooltip(this.componentRef.instance.position);
    }
  }

  closeTooltip(time : number){
    if (time != undefined){
      setTimeout(() => {
        this.pushAndHideTooltip();}, time)
    }
  }

  setPositionTooltip(pos : string | undefined){
    if (!pos){
      pos = 'below';
    }
    const {left, right, top, bottom} = this.elementRef.nativeElement.getBoundingClientRect();
    //account for inline styles to tooltip
    const {leftOffset, paddingLeft, topOffset, paddingTop, rightOffset, paddingRight} = this.setPositionsbyInlineStyles();
    switch (pos) {
      case 'below' :
      {
        this.componentRef!.instance.left = Math.round((left + (right-left)/2));
        break;
      }
      case 'above' : {
          this.componentRef!.instance.left = Math.round(left +(right-left)/2);
          this.componentRef!.instance.top = Math.round(top - topOffset + paddingTop);
          break;
      }
      case 'right' :{
        this.componentRef!.instance.left = Math.round(right - rightOffset - paddingRight);
        this.componentRef!.instance.top = Math.round(top + (bottom - top) / 2);
        break;
      }
      case 'left' :{
        this.componentRef!.instance.left = Math.round(left + paddingLeft + leftOffset);
        this.componentRef!.instance.top = Math.round((top + (bottom - top) / 2));
        break;
      }
    }
  }

  setPositionsbyInlineStyles(){
    const computedStyles= window.getComputedStyle(this.elementRef.nativeElement);
    //calculate offset and padding for left
    const leftOffset = parseInt(this.elementRef.nativeElement.style.left, 10) || 0;
    const paddingLeft = parseInt(computedStyles.paddingLeft, 10) || 0;
    //const offset and padding for right
    const rightOffset = parseInt(this.elementRef.nativeElement.style.right, 10) || 0;
    const paddingRight = parseInt(computedStyles.paddingRight, 10) || 0;
    //calculate offset and padding for top
    const topOffset = parseInt(this.elementRef.nativeElement.style.top, 10) || 0;
    const paddingTop= parseInt(computedStyles.paddingTop, 10) || 0;

      return {leftOffset, paddingLeft, topOffset, paddingTop, rightOffset, paddingRight}
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
    console.log(this.componentRef)
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