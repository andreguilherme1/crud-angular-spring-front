import { Component, Input } from '@angular/core';
import { ICourses } from '../../../interfaces/courses';
import { MatTableModule } from '@angular/material/table';
import { CategoryPipe } from '../../../pipes/category.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink, CategoryPipe],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  displayedColumns: string[] = ['id', 'name', 'category', 'actions'];

  @Input() courses!: ICourses[];
}
