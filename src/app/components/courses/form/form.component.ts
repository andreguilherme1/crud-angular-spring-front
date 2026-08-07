import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { ICategory } from '../../../interfaces/ICategory';
import { CoursesService } from '../../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICourses } from '../../../interfaces/ICourses';

@Component({
  selector: 'app-form.component',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  id: string | null = '';
  form!: FormGroup;
  categories: ICategory[] = [
    { value: 0, name: 'FrontEnd' },
    { value: 1, name: 'BackEnd' },
    { value: 2, name: 'FullStack' },
  ];

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _coursesService = inject(CoursesService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: [''],
      category: [''],
    });

    this.id = this._activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      this.onSearchById(this.id);
    }
  }

  public onSubmit() {
    if (this.id) {
      this._coursesService.editCourse(this.id, this.form.value).subscribe({
        next: (response) => {
          this.openSnackBar(`Curso ${response.name} foi editado com sucesso`, '');
          this.form.reset();
          this._router.navigate(['/courses']);
        },
        error: () => {
          this.openSnackBar('Erro ao editar curso', 'fechar');
        },
      });
    } else {
      this._coursesService.saveCourse(this.form.value).subscribe({
        next: (response) => {
          this.openSnackBar(`Curso ${response.name} foi salvo com sucesso`, '');
          this.form.reset();
          this._router.navigate(['/courses']);
        },
        error: () => {
          this.openSnackBar('Erro ao adicionar um curso', 'fechar');
        },
      });
    }
  }

  public onSearchById(id: string): void {
    this._coursesService.getCourseById(id).subscribe({
      next: (course) => {
        this.populateForm(course);
      }, error: () => {
        this.id = null;
      }
    });
  }

  private populateForm(course: ICourses) {
    this.form.patchValue({
      name: course.name,
      category: course.category,
    });
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }
}
