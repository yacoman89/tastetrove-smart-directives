import { ChangeDetectionStrategy, Component, HostBinding, Inject } from '@angular/core';
import { ERROR_PAGE_IMAGE_LINK } from '../../../providers';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'tt-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent {
  @HostBinding('class') get class(): string {
    return 'w-full pt-20 flex flex-col justify-center items-center'
  }

  constructor(@Inject(ERROR_PAGE_IMAGE_LINK) public errorPageImageLink: string, title: Title) {
    title.setTitle('TasteTrove | 404');
  }
}
