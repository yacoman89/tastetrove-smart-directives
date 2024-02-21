import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CREATE_READY } from '../../../providers';

@Component({
  selector: 'tt-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule]
})
export class NavbarComponent {
  constructor(@Inject(CREATE_READY) public createReady: boolean) {}
}
