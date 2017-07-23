import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeopleService } from "../general.service";

@Component({
    selector:"gaft-info",
    templateUrl:"./gaft-form.component.html",
    styleUrls: ['./gaft-form.component.css']
})

export class GaftFormComponent implements OnInit{

    formData = [];
    errorMessage: string = '';
    isLoading: boolean = true;
    constructor(private route: ActivatedRoute,
              private peopleService: PeopleService,
              private router: Router) { }
    
    ngOnInit() {
        this.peopleService
            .getGaftTemplate()
            .subscribe(
                /* happy path */ p => this.formData = p,
                /* error path */ e => this.errorMessage = e,
                /* onCompleted */ () => this.isLoading = false);
    }
}