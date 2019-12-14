import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { IUser } from '../models/IUser';
import { IMotherRegistration } from '../models/IMotherRegistration'
import { UtilityService } from '../services/utility';
import { DoctorList, AnganwadiList, WeekDays } from '../data/UserType';
import { IDropdown } from '../models/IDropdown';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public user: any;
  dropdownAnganwadiList: IDropdown[] = AnganwadiList;
  dropdownDoctorList: IDropdown[] = DoctorList;
  dropdownDoctorAnganwadiDay: IDropdown[] = WeekDays;
  selectedDoctorDay: IDropdown[] = [];
  selectedAnganwadiDay: IDropdown[] = [];
  selectedAnganwadi: IDropdown[] = [];
  selectedDoctor: IDropdown[] = [];
  dropdownSettings = {};
  registerForm: FormGroup;
  motherReg: IMotherRegistration;
  loading = false;
  submitted = false;
  adharPattern = "^[0-9]{10}$";
  //   fileUploads: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: true,
      text: "Select one",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.registerForm = this.formBuilder.group({
      motherName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      aadhar: ['', [Validators.required, Validators.pattern('[0-9]{16}')  // validates input is digit
      ]],
      mobile: ['', [
        Validators.required, Validators.pattern('[0-9]{10}')  // validates input is digit
      ]],
      zip: ['', Validators.required,  Validators.pattern('[0-9]{6}')],
      doctorVisitDayOfMonth: [[], Validators.required],
      anganwadiVisitDayOfWeek: [[], Validators.required],
      anganwadi: [[], Validators.required],
      fertilityDate: ['', Validators.required],
      expectedDeliveryDate: ['', Validators.required],
      doctor: [[], Validators.required],
      isHivInfected: ['', Validators.required],
      otherComplications: ['', Validators.required],
      numberOfBabies: ['', Validators.required],
      numberOfPregnency: ['', Validators.required],
      husbandName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(6)],
      // motherName: ['', Validators.required],
      // anganwadi: [[], Validators.required],
      // email: ['', Validators.required],
      // userType: [[], Validators.required],
      // LastName: ['', Validators.required],
      // aadhar: ['', [Validators.required, Validators.pattern('[0-9]{16}')  // validates input is digit
      // ]],
      // mobile: ['', [
      //   Validators.required,
      //   Validators.pattern('[0-9]{10}')  // validates input is digit
      // ]],
      // UserName: ['', Validators.required],
      // Password: ['', [Validators.required, Validators.minLength(6)]]
    });
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


    let user = <IMotherRegistration>{};
    var motherReg: IMotherRegistration = this.utilityService.assignObject(user, this.registerForm.value);
    motherReg.doctorId = this.selectedDoctor[0].id;
    motherReg.isHivInfected = false;
    motherReg.anganwadiId = this.selectedAnganwadi[0].id;
    motherReg.doctorVisitDayOfMonth = this.selectedDoctorDay[0].itemName;
    motherReg.anganwadiVisitDayOfWeek = this.selectedAnganwadiDay[0].itemName;
    motherReg.numberOfBabies = + motherReg.numberOfBabies;
    motherReg.numberOfPregnency = + motherReg.numberOfPregnency;
    this.userService.registerMother(motherReg).subscribe((res: any) => {
      if (res) {

      }
    });
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedAnganwadi);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedAnganwadi);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}