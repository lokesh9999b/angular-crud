import { Component, OnInit, signal } from '@angular/core';
import { Students } from '../../models/students';
import { RouterLink } from '@angular/router';
import { Student } from '../../services/student';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './students-list.html',
  styleUrl: './students-list.css',
})
export class StudentsList implements OnInit{

  studentsList= signal<Students[]>([]);

  isLoading= signal<boolean>(true);
  constructor( private studentService: Student,

  ) {}


  ngOnInit(): void {
    this.fetchStudents(); 
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        console.log('Fetched students:', data);
        this.studentsList.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching students:', error);
        this.isLoading.set(false);
      }
    })
  }
  deleteStudent(rollNumber: string): void {
    if (confirm(`Are you sure you want to delete this student with rollnumber: ${rollNumber}?`)) {
      this.studentService.deleteStudentByRollNumber(rollNumber).subscribe({
        next: () => {
          alert('Student deleted successfully');
          this.studentsList.update(students => students.filter(student => student.rollNumber !== rollNumber));
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          alert('Failed to delete student. Please try again.');
        }
      
      });
    }
  }



}
