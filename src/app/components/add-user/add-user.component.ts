import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
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
  message: string = '';
  id!: {
    uId: number
  }

  constructor(private router: Router, private formbuilder: FormBuilder, private curd: JsonCurdService, private acitveroute: ActivatedRoute) {
    this.addUserForm = this.formbuilder.group({
      id: [{ value: '', disabled: true }],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z\\s]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
      userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s-]+$')]],
      state: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s-]+$')]],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],

    });
    this.addUserForm.valueChanges.subscribe(() => {
      if (this.addUserForm.valid) {
        this.message = '';
      }
      // else {
      //   this.message = "Please fill the correct form";
      // }
    });

  }

  onCancle() {
    this.router.navigate([''])
  }

  onSubmite() {
    if (this.addUserForm.valid) {
      this.message = '';
      this.isEdit = true;
      this.curd.postData(this.addUserForm.value).subscribe(res => {
        // this.router.navigate(['/'])
        this.message = "Form is successfully submitted";
        this.addUserForm.reset();
        this.isEdit = false;

        setTimeout(() => {
          this.message = ''
        }, 2000);
      });
    } else {
      this.addUserForm.markAllAsTouched();
      this.message = "Please fill the correct form";
    }
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
