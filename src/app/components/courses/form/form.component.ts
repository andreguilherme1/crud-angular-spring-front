import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form.component',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  private readonly _formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: [''],
      category: [''],
    });
  }

  onSubmit() {
    console.log('submit')
  }
}
