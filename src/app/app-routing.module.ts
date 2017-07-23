import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeopleListComponent } from "./people-list/people-list.component";
import { DefaultComponent } from "./default-component/default.component";
import { PersonDetailsComponent } from "./person-details/person-details.component";
import { GaftFormComponent } from "./gaft-form-details/gaft-form.component";

// Route config let's you map routes to components
const routes: Routes = [
  // map '/persons' to the people list component
  {
    path: '',
    component: DefaultComponent,
  },
  // map '/persons' to the people list component
  // {
  //   path: 'maintains',
  //   component: GaftFormComponent,
  // },
  // map '/menu' to the people list component
  {
    path: 'menu/:menuItem',
    component: PeopleListComponent,
  },
  // map '/persons/:id' to person details component
  {
    path: 'users/:id', 
    component: PersonDetailsComponent 
  },
  // map '/' to '/persons' as our default route
  // {
  //   path: '',
  //   redirectTo: '/users',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routing = RouterModule.forRoot(routes);