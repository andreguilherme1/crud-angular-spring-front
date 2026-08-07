import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ICourses } from '../../interfaces/ICourses';
import { CoursesService } from '../../services/courses.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-course-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-course-dialog.component.html',
  styleUrl: './delete-course-dialog.component.scss',
})
export class DeleteCourseDialogComponent {
  data = inject<{ course: ICourses }>(MAT_DIALOG_DATA);

  private readonly _coursesService = inject(CoursesService)
  private readonly _snackBar = inject(MatSnackBar)
  private readonly dialogRef = inject(MatDialogRef<DeleteCourseDialogComponent>);

  onDelete(id: string) {
    this._coursesService.deleteCourse(id).subscribe({
      next: () => {
       this.openSnackBar(`Curso ${id} deletado com sucesso`, '');
       this.dialogRef.close(true);
      },
      error: () => {
        this.openSnackBar('Erro ao deletar um curso', 'fechar');
      }
    })
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }
}
