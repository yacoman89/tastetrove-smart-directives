import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './feature/navbar/navbar.component';
import { RecipesStateModule } from '../store/recipes/recipes.state.module';

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, NavbarComponent, RecipesStateModule]
})
export class AppComponent {
  @HostBinding('class') get class(): string {
    return 'h-full flex flex-col';
  }
}
