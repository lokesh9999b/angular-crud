import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { Students } from '../../models/students';
import { RouterLink } from '@angular/router';
import { Student } from '../../services/student';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: '/students-list.html',
  styleUrl: '/students-list.css',
})
export class StudentsList implements OnInit , OnChanges {

  studentsList: Students[] = [];

  isLoading: boolean = true;
  constructor( private studentService: Student,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.fetchStudents(); 
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        console.log('📦 Data received from MongoDB:', data);
        this.studentsList = data;
        this.isLoading = false;
        this.studentsList = [...data];
        // this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching students:', error);
        this.isLoading = false;
      }
    });
  }
  deleteStudent(rollNumber: string): void {
    if (confirm(`Are you sure you want to delete this student with rollnumber: ${rollNumber}?`)) {
      this.studentService.deleteStudentByRollNumber(rollNumber).subscribe({
        next: () => {
          alert('Student deleted successfully');
          this.studentsList = this.studentsList.filter(student => student.rollNumber !== rollNumber);
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          alert('Failed to delete student. Please try again.');
        }
      
      });
    }
  }


  ngOnChanges(): void {
  }

}
