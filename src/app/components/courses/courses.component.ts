import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoursesService } from '../../services/courses.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ICourses } from '../../interfaces/courses';

@Component({
  selector: 'app-courses',
  imports: [MatTableModule, MatToolbarModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class Courses implements OnInit {
  displayedColumns: string[] = ['name', 'category'];
  courses: ICourses[] = [];

  private _coursesService = inject(CoursesService);

  ngOnInit(): void {
    this.getCourses();
  }

  private getCourses(): void {
    this._coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }
}
