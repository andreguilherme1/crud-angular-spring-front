import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CoursesService } from '../../services/courses.service';
import { ICourses } from '../../interfaces/courses';

@Component({
  selector: 'app-courses',
  imports: [MatTableModule, MatToolbarModule, MatCardModule],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
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
