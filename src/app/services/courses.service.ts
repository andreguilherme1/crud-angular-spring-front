import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICourses } from '../interfaces/ICourses';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly _http = inject(HttpClient);
  private readonly API = '/api/courses';

  getCourses(): Observable<ICourses[]> {
    return this._http.get<ICourses[]>(this.API);
  }

  getCourseById(id: string): Observable<ICourses> {
    return this._http.get<ICourses>(`${this.API}/${id}`);
  }

  saveCourse(course: ICourses) {
    return this._http.post<ICourses>(this.API, course);
  }
}
