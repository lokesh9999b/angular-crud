import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { University } from '../models/university';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Universities {

  private apiUrl = 'http://localhost:3000/api/universities';
  constructor(private http: HttpClient){}

  searchUniversities(name: string): Observable<University[]>{
    return this.http.get<University[]>(this.apiUrl,{
      params: { name },
      withCredentials: true,
    });
  }
}