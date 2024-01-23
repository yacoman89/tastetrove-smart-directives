import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './feature/navbar/navbar.component';

@Component({
  selector: 'tt-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class.h-full') get full() { return true; }
  @HostBinding('class.flex') get flex() { return true; }
  @HostBinding('class.flex-col') get flexCol() { return true; }
}
