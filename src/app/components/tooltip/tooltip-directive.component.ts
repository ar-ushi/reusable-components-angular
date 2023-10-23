import { ApplicationRef, ComponentRef, Directive, ElementRef, EmbeddedViewRef, HostListener, Injector, Input, ViewContainerRef} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective{

  @Input() tooltip = '';

  private componentRef: ComponentRef<any> | null = null;

  constructor(
	private elementRef: ElementRef,
	private appRef: ApplicationRef, 
	private injector: Injector,
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
      this.componentRef = this.viewContainerRef.createComponent(TooltipComponent, {injector : this.injector});
      this.appRef.attachView(this.componentRef.hostView); //attach to VDOM
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement; 
      document.body.appendChild(domElem);
      this.setTooltipProperties();
    }
  }

  private setTooltipProperties(){
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.tooltip;
    }
  }

  @HostListener('mouseleave') 
  onMouseLeave() : void {
    this.destroy();
  }

  ngOnDestroy() : void {
    this.destroy(); //remove tooltip when host comp destroyed to prevent memoryleaks
  }

  destroy() : void {
    if (this.componentRef !== null){
      this.appRef.detachView(this.componentRef.hostView)
      this.componentRef.destroy();
      this.componentRef = null; //reinitalize for next instance
    }
  }
}

