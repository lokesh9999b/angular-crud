import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students } from '../models/students';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Student {
  private apiUrl = 'http://localhost:3000/students';
  constructor(private http: HttpClient) {}

  addStudent(student: Students): Observable<any> {

    return this.http.post<any>(this.apiUrl, student, {
      withCredentials: true,
    });

  }
  getStudents(): Observable<Students[]> {
    return this.http.get<Students[]>(this.apiUrl, {
      withCredentials: true,
    });
  } 
  getStudentByrollNumber(rollNumber: string): Observable<Students> {
    return this.http.get<Students>(`${this.apiUrl}/${rollNumber}`, {
      withCredentials: true,
    });
  }
  updateStudentByRollNumber(rollNumber: string, student: Students): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${rollNumber}`, student, {
      withCredentials: true,
    });
  }
  deleteStudentByRollNumber(rollNumber: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${rollNumber}`, {
      withCredentials: true,
    });
  }
}
