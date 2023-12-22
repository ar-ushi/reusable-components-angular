import { Component, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @ContentChildren(TabComponent) readonly tabs: QueryList<TabComponent>;

  get index() : number{
    const tabs = this.tabs.toArray();
    return tabs.findIndex(tab => tab.active);
  }

  ngAfterContentInit(){
    
  }
  
}
