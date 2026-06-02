import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Student } from '../../services/student';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-students',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-students.html',
  styleUrl: './edit-students.css',
})
export class EditStudents implements OnInit {

  rollNumber: string = '';
  student = {
    name: '',
    rollNumber: '',
    age: 0,
    grade: ''
  };
  constructor(
    private route: ActivatedRoute,
    private studentService: Student,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.rollNumber = this.route.snapshot.paramMap.get('rollNumber') || '';
    if (this.rollNumber) {
      this.loadStudent();
    }
  }
  loadStudent(): void {
    this.studentService.getStudentByrollNumber(this.rollNumber).subscribe({
      next: (data) => {
        this.student = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching student:', error);
        alert('Failed to load student details. Please try again.');
      }
      });
  }

  onUpdate(): void {
    this.studentService.updateStudentByRollNumber(this.rollNumber, this.student).subscribe({
      next: () => {
        alert('Student updated successfully');
        this.router.navigate(['/students']);

      },
      error: (error) => {
        console.error('Error updating student:', error);
        alert('Failed to update student. Please try again.');
      }
    });
  }


}
