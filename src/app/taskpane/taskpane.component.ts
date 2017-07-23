import { Component, OnInit,NgModule, Input } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';

declare var test: any;
import { PeopleService } from "../general.service";
// import {PeopleListComponent} from '../people-list/people-list.component';
import * as GlobalVariable from "../app-config-file";

@Component({
    selector:'task-pane',
    templateUrl:"./taskpane.component.html"
})
// @Injectable()
export class TaskpaneComponent implements OnInit{
    // @Input() headerData:Object={};
    constructor(){}
    ngOnInit(){
             
    }
}