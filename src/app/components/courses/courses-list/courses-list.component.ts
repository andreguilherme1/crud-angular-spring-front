import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ICourses } from '../../../interfaces/ICourses';
import { MatTableModule } from '@angular/material/table';
import { CategoryPipe } from '../../../pipes/category.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCourseDialogComponent } from '../../../shared/delete-course-dialog/delete-course-dialog.component';

@Component({
  selector: 'app-courses-list',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    RouterLink,
    CategoryPipe,
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  displayedColumns: string[] = ['id', 'name', 'category', 'actions'];
  isSearching: boolean = false;
  id: string = '';

  @Input() courses!: ICourses[];
  @Output() searchId = new EventEmitter<string>();
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  private readonly _router = inject(Router);
  private readonly _dialog = inject(MatDialog);
  @Output() deleted = new EventEmitter<void>();

  onSearch() {
    if (this.isSearching) {
      this.searchId.emit(this.id);
    } else {
      this.isSearching = true;
      setTimeout(() => this.inputRef.nativeElement.focus(), 1);
    }
  }

  onClose() {
    this.isSearching = false;
    this.id = '';
    this.searchId.emit('');
  }

  onEdit(course: ICourses) {
    this._router.navigate([`/courses/edit/${course.id}`]);
  }

  onDelete(course: ICourses) {
    const dialogRef = this._dialog.open(DeleteCourseDialogComponent, {
      data: { course },
    });

    dialogRef.afterClosed().subscribe((deleted) => {
      if (deleted) {
        this.deleted.emit();
      }
    });
  }
}
