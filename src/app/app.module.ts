import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AccordionModule,DatepickerModule,ModalModule } from 'ng2-bootstrap';
import { FxDatepickerComponent }     from './datepicker-component/datepicker.component';
// import {DatePickerModule} from 'ng2-datepicker-bootstrap';
import { DatePickerModule } from 'ng2-datepicker';
import { MomentModule } from 'angular2-moment';

import { AppDirectiveModule } from './app-directive.module'
import { AppComponent } from './app.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleService } from './general.service';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { GaftFormComponent } from "./gaft-form-details/gaft-form.component";
import { GaftFormMainComponent } from "./gaft-form/gaft-form-main.component";
import { TaskpaneComponent } from "./taskpane/taskpane.component";
import {TitleCase} from './pipes/title-case.pipe';

import { DefaultComponent } from "./default-component/default.component";

import { AppRoutingModule } from "./app-routing.module";
import { ClickOutsideModule}   from './ng2-click-outside-component/ng2-click-outside.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    PersonDetailsComponent,
    GaftFormComponent,
    TitleCase,
    FxDatepickerComponent,
    GaftFormMainComponent,
    TaskpaneComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DatePickerModule,
    MomentModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AppDirectiveModule,
    Ng2SmartTableModule,
    AccordionModule.forRoot(),
    DatepickerModule.forRoot(),
    ClickOutsideModule,
    ModalModule.forRoot()
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule {
  public dt: Date = new Date();
}
