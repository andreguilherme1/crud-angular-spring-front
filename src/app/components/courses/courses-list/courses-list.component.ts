import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ICourses } from '../../../interfaces/ICourses';
import { MatTableModule } from '@angular/material/table';
import { CategoryPipe } from '../../../pipes/category.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


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
}
