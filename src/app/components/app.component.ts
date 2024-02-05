import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './feature/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, NavbarComponent]
})
export class AppComponent {
  @HostBinding('class.h-full') get full() { return true; }
  @HostBinding('class.flex') get flex() { return true; }
  @HostBinding('class.flex-col') get flexCol() { return true; }
}
