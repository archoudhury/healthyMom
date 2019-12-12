import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { IUser } from '../models/IUser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public user: any;
  dropdownList = [];
  dropdownListForUserType = [];
  selectedUserType = [];
  selectedAnganwadi = [];
  dropdownSettings = {};
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  adharPattern = "^[0-9]{10}$";
  //   fileUploads: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.dropdownList = [
      { "id": 1, "itemName": "Anganwadi 1" },
      { "id": 2, "itemName": "Anganwadi 2" },
      { "id": 3, "itemName": "Anganwadi 3" },
      { "id": 4, "itemName": "Anganwadi 4" },
      { "id": 5, "itemName": "Anganwadi 5" },
      { "id": 6, "itemName": "Anganwadi 6" },
      { "id": 7, "itemName": "Anganwadi 7" },
      { "id": 8, "itemName": "Anganwadi 8" },
      { "id": 9, "itemName": "Anganwadi 9" },
      { "id": 10, "itemName": "Anganwadi 10" }
    ];
    this.dropdownSettings = {
      singleSelection: true,
      text: "Select Anganwadi",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.registerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      anganwadi: [[], Validators.required],
      userType: [[], Validators.required],
      LastName: ['', Validators.required],
      Adhar: ['', [Validators.required, Validators.pattern('[0-9]{16}')  // validates input is digit
      ]],
      Number: ['', [
        Validators.required,
        Validators.pattern('[0-9]{10}')  // validates input is digit
      ]],
      //   fileUpload: [[], Validators.required],
      UserName: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.userService.getUser().subscribe((user: IUser) => {

    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  // A helper to DRY the code
  validateMinMax(num) {
    return
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    let user = <any>{};
    user.Adhar = this.registerForm.value.Adhar;
    user.FirstName = this.registerForm.value.FirstName;
    user.LastName = this.registerForm.value.LastName;
    user.Number = this.registerForm.value.Number;
    user.UserName = this.registerForm.value.UserName;
    user.Password = this.registerForm.value.Password;
    //   user.ProfilePicture = this.fileUploads[0];
    this.userService.addUser(user);
    //   .subscribe((data: any) => {
    //       if (data && data.status && data.status == 201) {
    //           this.loading = false;
    //           this.router.navigateByUrl('/login');
    //       }
    //       else {
    //           let asd = "error occured";
    //       }
    //   });
  }



  //   fileChange(event: any) {
  //       let reader = new FileReader();
  //       let filesToUpload: any[] = [];
  //       var file;
  //       if (event.target && event.target.files && event.target.files.length == 1) {
  //           for (let i = 0; i < event.target.files.length; i++) {
  //               file = event.target.files[i];
  //               let fileUpload: any = { fileName: file.name, fileType: "", fileValue: [] };

  //               reader = new FileReader();
  //               reader.onload = (function (file) {
  //                   return function (e: any) {
  //                       fileUpload.fileValue = e.target.result.split(',')[1];
  //                       fileUpload.fileType = e.target.result.split(',')[0];
  //                   };
  //               })(file);

  //               if (this.fileUploads.length == 0 && filesToUpload.length == 0) {
  //                   filesToUpload.push(fileUpload);
  //               } else {
  //                   alert("Only single photo allowed");
  //               }

  //               reader.readAsDataURL(file);
  //           }
  //       }
  //       else {
  //           alert("Only single photo allowed");
  //       }

  //       this.fileUploads = [...this.fileUploads, ...filesToUpload];
  //   }

  //   multileFileChange(event: any) {
  //       let reader = new FileReader();
  //       let filesToUpload: any[] = [];
  //       var file;
  //       if (event.target && event.target.files && event.target.files.length > 0) {
  //           for (let i = 0; i < event.target.files.length; i++) {
  //               file = event.target.files[i];
  //               let fileUpload: any = { fileName: file.name, fileType: "", fileValue: [] };

  //               reader = new FileReader();
  //               reader.onload = (function (file) {
  //                   return function (e:any) {
  //                       fileUpload.fileValue = e.target.result.split(',')[1];
  //                       fileUpload.fileType = e.target.result.split(',')[0];
  //                   };
  //               })(file);

  //               if (this.fileUploads.filter(file => file.fileName == fileUpload.fileName).length == 0 && filesToUpload.filter(file => file.fileName == fileUpload.fileName).length == 0) {
  //                   filesToUpload.push(fileUpload);
  //               }

  //               reader.readAsDataURL(file);
  //           }
  //       }

  //       this.fileUploads = [...this.fileUploads, ...filesToUpload];
  //   }

  onItemSelect(item:any){
    console.log(item);
    console.log(this.selectedAnganwadi);
}
OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.selectedAnganwadi);
}
onSelectAll(items: any){
    console.log(items);
}
onDeSelectAll(items: any){
    console.log(items);
}
}