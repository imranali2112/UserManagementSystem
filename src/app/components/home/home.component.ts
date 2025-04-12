import { Component, Inject } from '@angular/core';
import { JsonCurdService } from '../../services/json-curd.service';
import { UserData } from '../../interface/user-data';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  apiData: UserData[]=[];
  message: string = '';

  constructor(private curd: JsonCurdService, private router : Router) {}

  ngOnInit(): void{ 
    this.getAllData()
  }

  getAllData() {
    this.curd.getData().subscribe(res => {
      this.apiData = res;
    })
  }

  addNewUser(){
    this.router.navigate(['/adduser']);
  }

  onUpdate(id: number){
    this.router.navigate(['/adduser', id]);
  } 


  onDelete(id: number){
    if(confirm("Are you sure you want to delete this user?")){
      this.curd.deleteData(id).subscribe(res =>{
        this.getAllData();
        this.message = "User is deleted successfully!";
      });
      setTimeout(() => {
        this.message = '';
      }, 2000);
    }
   
  }
}
