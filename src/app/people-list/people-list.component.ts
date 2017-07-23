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
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  date: DateModel;
  options : DatePickerOptions;
  urlParam;
  private sub:any;
  error:any={isError:false,errorMessage:''};
  people = [];
  appData = [];
  headerData = [];
  actualData =[];
  errorMessage: string = '';
  dataSubmit:Object = {};
  smModal;
  aliasForm;
  isLoading: boolean = true;
  public newdt: Date = new Date();
  version2:boolean=false;
  versionText= "Enable";
  complexForm : FormGroup;
  originalDate:string = "";
  dateValidation : boolean = false;
  bankName;
  tableName;
  tableInsertResponse;
  finalData={};
  dataToSend={
    "STARTDATE":""
  };
  constructor(private peopleService: PeopleService,fb: FormBuilder,private route:ActivatedRoute) {
    // debugger;
    this.complexForm = fb.group({
      'fromBUID':[null, Validators.required],
      "fromLocal":"",
      'fromTrendVariable' : "",
      'fromTrendValue' : "",
      'toBUID':[null, Validators.required],
      "toLocal":"",
      'toTrendValue' : "",
      "versionControl":false,
      "date":""
    });
    this.options = new DatePickerOptions({
      format:"DD/MM/YYYY"
    });
   }
  onDateChange(event){
    if(!(event == undefined || event ==null)){
      var curDate = this.dateValue;
      var selDate = event.formatted;    
      this.originalDate = event.formatted;
      if(curDate > selDate){
        this.dateValidation = false;
      }
      else{
        this.dateValidation = true;
      }
      this.dataToSend.STARTDATE =selDate;
    }
  }
  postData={
    "name": "Debjeet",
    "job": "leader"
  };
  delId = 1;
  poData;po2Data;
  
  ngOnInit(){
    // this.peopleService.postSampleData(this.postData)    
    //   .subscribe(
    //      /* happy path */ p => this.tableInsertResponse = p,
    //      /* error path */ e => this.errorMessage = e,
    //      /* onCompleted */ () => this.isLoading = false);
    //     //  console.log(this.tableInsertResponse);
    // debugger
    this.urlParam = this.route.snapshot.params['menuItem'];
    this.headerData = GlobalVariable.AppConfigFile[''+this.urlParam+''].field;
    this.tableName = GlobalVariable.AppConfigFile[''+this.urlParam+''].table;
    // this.columns = GlobalVariable.AppConfigFile[''+this.urlParam+''].field;
    var columnData=this.headerData;
    for(var i=0;i<Object.keys(columnData).length;i++){
        this.dataToSend[columnData[i]]=""; 
    }
      this.dataToSend["ID"]=3;
    // console.log(this.dataToSend);

      // this.dataToSend
    
    // debugger;
// Sample Post Information    
    this.peopleService
        .postSampleData(this.postData)
        .subscribe(
        /* happy path */ p => this.poData = p,
         /* error path */ e => this.errorMessage = e,
         /* onCompleted */ () => this.isLoading = false);

// Sample Delete Information    
    this.peopleService
        .delSampleData(this.delId)
        .subscribe(
        /* happy path */ p => this.poData = p,
         /* error path */ e => this.errorMessage = e,
         /* onCompleted */ () => this.isLoading = false);

    this.peopleService
          .updateSampleData(this.delId,this.postData)
          .subscribe(
        /* happy path */ p => this.po2Data = p,
         /* error path */ e => this.errorMessage = e,
         /* onCompleted */ () => this.isLoading = false);

    
    this.peopleService
      .getAll()
      .subscribe(
         /* happy path */ p => this.people = p,
         /* error path */ e => this.errorMessage = e,
         /* onCompleted */ () => this.isLoading = false);

    this.peopleService
      .getAppList()
      .subscribe(
         /* happy path */ p => this.appData = p,
         /* error path */ e => this.errorMessage = e,
         /* onCompleted */ () => this.isLoading = false);

    // this.sub = this.route.params.subscribe(params => {
      
    //   // debugger;
    //   // this.dateValue = this.newdt.getDate()+'/'+(this.newdt.getMonth()+1)+'/'+this.newdt.getFullYear();
    // });
  }
  dateValue: string = this.newdt.getDate()+'/'+(this.newdt.getMonth()+1)+'/'+this.newdt.getFullYear();
  checkVersion(){
    this.version2 = this.version2 ? (this.version2 = false) : (this.version2 = true);
    this.enableCheck(this.version2);
  }
  enableCheck(a){
    // console.log(a);
    this.versionText = a ? "Disable" : "Enable";
  }
  rootSelectedAlias(a){
    // console.log(a);
  }
  onSelectionDone(a){
    if(a == undefined){
      return;
    }
    else{
      console.log(a);
      this.originalDate = a.formatted;
    }
  }
  submitForm(value: any){

    /**
     * {
      "table": "AUTH_CODES",
      "fields": {
        "ID": "4",
        "FROMBUID": "1",
        "FROMTRENDVARIABLE": "2"
      }
    } 
     */

    this.finalData["table"] = this.tableName;
    this.finalData["fields"] = this.dataToSend;
    // console.log(this.finalData);
    var testData = {
      "table": "ALIAS_SCORING",
        "fields": {
          "ID": "5",
          "FROMBUID": "2"
        }
    }
    this.peopleService.postTableData(testData)
      .subscribe(
         /* happy path */ p => this.tableInsertResponse = p,
         /* error path */ e => this.errorMessage = e,
         /* onCompleted */ () => this.isLoading = false);
    
    // console.log(this.tableInsertResponse);
  }
  
  menuName(){
    return "aliasScoring";
  }
}
