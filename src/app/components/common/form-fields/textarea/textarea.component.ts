import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'tt-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TextareaComponent {
  @Input({ required: true }) label!: string;
  @Input() hideLabel?: boolean;
  @Input() placeholder?: string;
  @Input({ required: true }) rows!: number;
  @Input({ required: true }) control!: FormControl<string | null>;
  @Input() maxLength?: number;
  @Input() showLength?: boolean;
  readonly length = signal(0);
  private destroyRef = inject(DestroyRef);
  private changeDetector = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.length.set(this.control.value?.length || 0);
    });
    const markAsTouched = this.control.markAsTouched.bind(this.control);
    this.control.markAsTouched = () => {
      markAsTouched();
      this.changeDetector.detectChanges();
    }
  }
}
