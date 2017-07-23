import { Component, OnInit,ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { PeopleService } from "../general.service";
import {ActivatedRoute} from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var test: any;

import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { ValidationService } from '../validation-service/validation-service';
// import {AppConfigFile} from "../app-config-file";
import * as GlobalVariable from "../app-config-file";

@Component({
  selector: 'app-people-list',
  templateUrl: './default.component.html',
})
export class DefaultComponent {
  
}
