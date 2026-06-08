import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../services/student';
import { Students } from '../../models/students';
import { University} from '../../models/university';
import { Universities } from '../../services/university';
import { debounceTime, distinctUntilChanged, switchMap, filter, Subject} from 'rxjs';


@Component({
  selector: 'app-add-students',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-students.html',
  styleUrl: './add-students.css',
})
export class AddStudents {

  student = {
    name: '',
    rollNumber: '',
    age: 0,
    grade: '',
    university: ''
  };

  errorMessage: string = '';

  universitySuggestions:University[] = [];
  showSuggestions: boolean = false;
  private searchSubject = new Subject<string>();


  constructor(private router: Router, private studentService: Student, private universityService: Universities) {

    this.searchSubject.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    switchMap(term => this.universityService.searchUniversities(term))
  ).subscribe({
    next: (results) => {
      this.universitySuggestions = results;
      this.showSuggestions = results.length >0;
    },
    error: () =>{
      this.universitySuggestions =[];
      this.showSuggestions = false;
    }
  });

  }
  onUniversityInput(value: string): void {
    console.log(value);
    if (value.length < 2){
      this.universitySuggestions = [];
      this.showSuggestions = false;
      return;
    }
    this.searchSubject.next(value);
  }

  selectUniversity(uni: University): void {
    this.student.university = uni.name;
    this.showSuggestions = false;
    this.universitySuggestions = [];
  }


    


  onSubmit(form: NgForm) {
    if (form.valid) {
      this.errorMessage = '';
      
     
      this.studentService.addStudent(this.student).subscribe({
        next: (response) => {
          console.log('Student added successfully', response);
          alert('Student added successfully');
          this.router.navigate(['/students']);
        },
        error: (error) => {
          console.error('Error adding student', error);
          this.errorMessage = 'Failed to add student. Please try again.';
        }
      }); // 👈 Cleanly closes the subscribe block
    }
  }

  goBack() {
    this.router.navigate(['/students']);
  }
}