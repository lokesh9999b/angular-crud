import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../services/student';
import { Students } from '../../models/students';


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
    grade: ''
  };

  errorMessage: string = '';

  constructor(private router: Router, private studentService: Student) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.errorMessage = '';
      
      // 👑 Call the service and pass a clean configuration object containing next and error
      this.studentService.addStudent(this.student).subscribe({
        next: (response) => {
          console.log('Student added successfully', response);
          alert('Student added successfully');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error adding student', error);
          this.errorMessage = 'Failed to add student. Please try again.';
        }
      }); // 👈 Cleanly closes the subscribe block
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}