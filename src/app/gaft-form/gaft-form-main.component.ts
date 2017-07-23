import { Component, OnInit,NgModule, Input } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';

declare var test: any;
import { PeopleService } from "../general.service";
import {PeopleListComponent} from '../people-list/people-list.component';
import * as GlobalVariable from "../app-config-file";
import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
    selector:'gaft-form',
    templateUrl:"./gaft-form-main.component.html"
})
// @Injectable()
export class GaftFormMainComponent implements OnInit{
    // @Input() headerData:Object={};
    headerData:Object={};
    actualData:Object={};
    urlParam;
    sub:any;
    columns;
    columnObject:Object={};
    errorMessage: string = '';
    isLoading: boolean = true;
    finalData;
    constructor(
        private peopleListComponent:PeopleListComponent,
        private peopleService: PeopleService,
        private route:ActivatedRoute,
        private router:Router){}
        
    settings = {
    };
    newSettings={};
    
    ngOnInit(){

        this.sub = this.route.params.subscribe(params => {
            // debugger;
            this.settings={};
            this.columnObject = {};
            new test();
            
            this.urlParam = this.route.snapshot.params['menuItem'];
            if(this.urlParam != undefined){
                this.headerData = GlobalVariable.AppConfigFile[''+this.urlParam+''].field;
                this.finalData = GlobalVariable.AppConfigFile[''+this.urlParam+''];
                // this.columns = GlobalVariable.AppConfigFile[''+this.urlParam+''].field;
                var columnData=this.headerData;
                
                
                for(var i=0;i<Object.keys(columnData).length;i++){
                    this.columnObject[columnData[i]]={"title":columnData[i]}; 
                }
                this.newSettings["columns"]=this.columnObject;
                this.settings = Object.assign({}, this.newSettings);
                // console.log(this.settings);
                this.headerListData(this.finalData);
            }
            else{
                this.urlParam = "please select a menu";
                this.headerData = [];
                this.actualData = [];
            }
        })        
    }
    

    headerListData(entity){        
        // this.settings.columns = GlobalVariable.AppConfigFile[''+this.urlParam+''].field;
        
        // console.log(this.columnObject);
        this.peopleService
            .getActualData(entity)
            .subscribe(
            /* happy path */ p => this.actualData = p,
            /* error path */ e => this.errorMessage = e,
            /* onCompleted */ () => this.isLoading = false);
        // });
        
    }
}