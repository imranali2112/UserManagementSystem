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
    const nav = this.router.navigate(['/adduser', id]) 
    
  }

  onDelete(id: number){
    this.curd.deleteData(id).subscribe(res =>{
      this.getAllData();
    });
  }

  onView(id: number){
    this.router.navigate(['/viewuser', id])
  }
}
