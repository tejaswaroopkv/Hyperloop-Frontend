import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.scss']
})
export class AdminSigninComponent implements OnInit {

  public adminLoginForm: any = [];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setForm()
  }
  setForm() {
    this.adminLoginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z]{2,4})")]],
      password: ['', [Validators.required]],

    })
    this.resetForm();

  }
  resetForm() {
    this.adminLoginForm.reset();
  }
  onSigin(){
    
  }
}
