import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from '../../../common/form-fields/textarea/textarea.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map, shareReplay, startWith } from 'rxjs';
import { Comment } from '../../../../models/comment.model';

@Component({
  selector: 'tt-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TextareaComponent, ReactiveFormsModule]
})
export class NewCommentComponent implements OnInit {
  private readonly MIN_COMMENT_LENGTH = 3;
  readonly MAX_COMMENT_LENGTH = 1000;
  readonly MIN_COMMENT_ROWS = 3;
  @Input({ required: true }) user!: string;
  @Output() comment = new EventEmitter<Comment>;
  formGroup = new FormGroup({
    user: new FormControl<string | null>(this.user, Validators.required),
    date: new FormControl<string | null>('', Validators.required),
    comment: new FormControl<string | null>('', [Validators.required, Validators.maxLength(this.MAX_COMMENT_LENGTH), Validators.minLength(this.MIN_COMMENT_LENGTH)])
  })
  invalid$!: Observable<boolean>;

  ngOnInit(): void {
    this.resetForm();
    this.invalid$ = this.formGroup.statusChanges.pipe(
      startWith('INVALID'),
      map((status) => status === 'INVALID'),
      shareReplay(1)
    );
  }

  private setUser(): void {
    this.formGroup.controls.user.setValue(this.user);
  }

  private setDate(): void {
    this.formGroup.controls.date.setValue(new Date().toISOString());
  }

  get commentControl(): FormControl<string | null> {
    return this.formGroup.controls.comment;
  }

  private resetForm(): void {
    this.formGroup.reset();
    this.setUser();
    this.setDate();
  }

  onSubmit(): void {
    this.setDate();
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.comment.emit(this.formGroup.value as Comment);
      this.resetForm();
    }
  }
}
