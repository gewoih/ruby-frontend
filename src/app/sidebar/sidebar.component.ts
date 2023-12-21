import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'cs-sidebar',
  standalone: true,
  imports: [RouterLink, NgClass, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  collapsed = true;

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
