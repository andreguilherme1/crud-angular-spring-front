import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { ICategory } from '../../../interfaces/ICategory';
import { CoursesService } from '../../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

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
  form!: FormGroup;
  categories: ICategory[] = [
    { value: 0, name: 'FrontEnd' },
    { value: 1, name: 'BackEnd' },
    { value: 2, name: 'FullStack' },
  ];

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _coursesService = inject(CoursesService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _location = inject(Location);

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: [''],
      category: [''],
    });
  }

  onSubmit() {
    console.log(this.form.value);

    this._coursesService.saveCourse(this.form.value).subscribe({
      next: (response) => {
        this.openSnackBar(`Curso ${response.name} foi salvo com sucesso`, '');
        this.form.reset();
        this._location.back();
      },
      error: () => {
        this.openSnackBar('Erro ao adicionar um curso', 'fechar');
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }
}
