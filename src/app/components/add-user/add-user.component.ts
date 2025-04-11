import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonCurdService } from '../../services/json-curd.service';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  addUserForm: FormGroup;
  userData: any;
  isEdit: boolean = false;
  id!: {
    uId: number
  }

  constructor(private router: Router, private formbuilder: FormBuilder, private curd: JsonCurdService, private acitveroute: ActivatedRoute) {
    this.addUserForm = this.formbuilder.group({
      id: new FormControl({ value: '', disabled: true }),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      userName: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipCode: new FormControl(''),
    })
  }

  onCancle() {
    this.router.navigate([''])
  }

  onSubmite() { 
    this.isEdit = true;
    this.curd.postData(this.addUserForm.value).subscribe(res =>{
      this.router.navigate(['/'])
      this.isEdit = false;
    });
  }

  ngOnInit(): void {
    const id = this.acitveroute.snapshot.params['id']
    console.log(id, "the id is correctly fetching");

    if (id) {
      this.isEdit = true;
      this.id = {
        uId: id
      }
      this.curd.getDataById(this.id.uId).subscribe(res => {
        this.userData = res;

        this.addUserForm.setValue({
          id: this.userData.id || '',
          firstName: this.userData.firstName || '',
          lastName: this.userData.lastName || '',
          userName: this.userData.userName || '',
          city: this.userData.city || '',
          state: this.userData.state || '',
          zipCode: this.userData.zipCode || ''
        })
      });


    }
  }

  onUpdate() {
    this.isEdit = false;
    this.curd.putDataById(this.id.uId, this.addUserForm.value).subscribe(res => {
      this.router.navigate([''])
    });
  }
}
