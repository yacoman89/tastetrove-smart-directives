import { ChangeDetectionStrategy, Component, ElementRef, Inject, Injector, Input, afterNextRender, inject } from '@angular/core';
import { WINDOW, WindowProvider } from '../../../providers';

@Component({
  selector: 'tt-overlay',
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WindowProvider]
})
export class OverlayComponent {
  private setVisible: boolean = false;
  @Input({ required: true }) set visible(visible: boolean) {
    this.setVisible = visible;
    if (visible) {
      afterNextRender(() => this.attach(), { injector: this.injector });
    }
  }
  get visible(): boolean {
    return this.setVisible;
  }
  @Input({ required: true }) attachTo!: HTMLElement;
  @Input() attachAbove = true;
  @Input() paddingLeft?: number;
  @Input() includeArrow = true;
  private readonly injector = inject(Injector);
  private readonly paddingY = 68;

  constructor(private el: ElementRef, @Inject(WINDOW) private window: Window) {}

  private get overlayElement(): HTMLDivElement {
    return this.el.nativeElement.firstElementChild;
  }

  private get overlayRects(): DOMRect {
    return this.overlayElement?.getBoundingClientRect();
  }

  private get overlayHeight(): number {
    return this.overlayRects?.height || 0;
  }

  private get overlayLeft(): number {
    return this.overlayRects?.left || 0;
  }

  private get attachmentRect(): DOMRect {
    return this.attachTo.getBoundingClientRect();
  }

  private get attachmentTop(): number {
    return this.attachmentRect.top;
  }

  private get attachmentBottom(): number {
    return this.attachmentRect.bottom;
  }

  private get arrowHeight(): number {
    return this.includeArrow ? 5 : 0;
  }

  private get canAttachAbove(): boolean {
    return (this.attachmentTop - this.overlayHeight - this.paddingY - this.arrowHeight) > 0;
  }

  private get canAttachBelow(): boolean {
    return (this.attachmentBottom + this.overlayHeight + this.paddingY + this.arrowHeight) < this.window.innerHeight;
  }

  get shouldAttachAbove(): boolean {
    return (this.attachAbove && this.canAttachAbove) || (!this.attachAbove && !this.canAttachBelow);
  }

  private attach(): void {
    if (this.shouldAttachAbove) {
      this.overlayElement.style.top = `${this.attachmentTop - this.overlayHeight - this.arrowHeight}px`;
    } else {
      this.overlayElement.style.top = `${this.attachmentBottom + this.arrowHeight}px`;
    }
    if (this.paddingLeft) {
      this.overlayElement.style.left = `${this.overlayLeft + this.paddingLeft}px`;
    }
  }
}
