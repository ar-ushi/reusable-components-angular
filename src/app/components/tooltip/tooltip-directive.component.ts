import { ComponentRef, Directive, ElementRef, HostListener, Input, ViewContainerRef} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective{

  @Input() tooltip = '';
  @Input() hideTooltip? : boolean | undefined = false;
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
      document.body.appendChild(document.body.appendChild(this.componentRef.location.nativeElement)      );
    } else {
      if (this.componentRef !== null) {
        this.componentRef.instance.hideTooltip = false; 
      }
    }
  }

  private setTooltipProperties(){
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.tooltip;
    }
  }

  @HostListener('mouseleave') 
  onMouseLeave() : void {
    if (this.componentRef !== null) {
    this.componentRef.instance.hideTooltip = true; 
    }
  }

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

