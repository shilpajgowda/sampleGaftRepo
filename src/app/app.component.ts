import { Component, OnInit,NgModule } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TitleCase } from './pipes/title-case.pipe';
import { Person } from './person';
import { PeopleService } from "./general.service";
// import { GaftFormMainComponent } from './gaft-form/gaft-form-main.component';
import {AppConfigFile} from "./app-config-file";

declare var test: any;

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@NgModule({
       declarations: [ TitleCase ]
})
export class AppComponent {
  public scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };
  title = 'GAFT';
  people = [];
  menuList;
  gaftData = [];
  listData =[]; 
  sub:any;
  subApp:any;
  errorMessage: string = '';
  isLoading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private router: Router) { }
  ngOnInit(){
    this.peopleService
      .getAll()
      .subscribe(
         /* happy path */ p => this.people = p,
         /* error path */ e => this.errorMessage = e,
         /* onCompleted */ () => this.isLoading = false);
    this.peopleService
        .getMenuList()
        .subscribe(
          /* happy path */ p => this.menuList = p.menuList,
          /* error path */ e => this.errorMessage = e,
          /* onCompleted */ () => this.isLoading = false
        )

        new test();
  }
  menuInfo(){
    $('#menu-content .collapse.in').each(function(){
        $(this).collapse('hide');
    });
  }



  menuSelected(menuItem){
      this.peopleService
        .getDetailMenu(menuItem)
        .subscribe(
          /* happy path */ p => this.gaftData = p.menuList,
          /* error path */ e => this.errorMessage = e,
          /* onCompleted */ () => this.isLoading = false);
    // });
  }
  submenuSelected(mItem){
    this.router.navigate(['/menu',mItem]);
    // this.gaftComponent.headerListData(mItem);
    // location.reload();
  }
  rootSelectedEnvfn(a,b){
    // console.log(a);
    a = (a !==null) ? a : null;
    b = (b !==null) ? b : null;
    console.log(a+"\n"+b);
    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['a']);
      this.peopleService
        .getAllAppData(a,b)
        .subscribe(
          /* happy path */ p => this.listData = p,
          /* error path */ e => this.errorMessage = e,
          /* onCompleted */ () => this.isLoading = false);
    });
  }
}
