import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoursesService } from '../../../services/courses.service';
import { MatCardModule } from '@angular/material/card';
import { ICourses } from '../../../interfaces/ICourses';
import { ErrorDialogComponent } from '../../../shared/error-dialog.component/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { CoursesListComponent } from '../courses-list/courses-list.component';

@Component({
  selector: 'app-courses',
  imports: [MatToolbarModule, MatCardModule, MatProgressSpinnerModule, CoursesListComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class Courses implements OnInit {
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

  onSearchById(id: string): void {
    if (!id) {
      this.getCourses();
      return;
    }

    this._coursesService
      .getCourseById(id)
      .pipe(
        finalize(() => {
          this._cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (courses) => {
          this.courses = [courses];
        },
        error: () => {
          this.courses = [];
          this.openDialog('Nenhum curso encontrado.');
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
