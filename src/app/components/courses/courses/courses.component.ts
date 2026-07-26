import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoursesService } from '../../../services/courses.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ICourses } from '../../../interfaces/courses';
import { ErrorDialogComponent } from '../../../shared/error-dialog.component/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CategoryPipe } from '../../../pipes/category.pipe';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-courses',
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CategoryPipe,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class Courses implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'actions'];
  courses: ICourses[] = [];
  isLoading: boolean = true;

  private readonly _coursesService = inject(CoursesService);
  private readonly _dialog = inject(MatDialog);
  private readonly _cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.getCourses();
  }

  private getCourses(): void {
    this.isLoading = true;

    this._coursesService
      .getCourses()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this._cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (courses) => {
          this.courses = courses;
        },
        error: () => {
          this.openDialog('Erro ao carregar lista de cursos.');
        },
      });
  }

  openDialog(error: string) {
    this._dialog.open(ErrorDialogComponent, {
      data: {
        erro: error,
      },
    });
  }
}
