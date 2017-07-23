import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Person } from './person';

const PEOPLE : Person[] = [
      // {id: 1, name: 'Luke Skywalker', avatar: "https://das"}
    ];

@Injectable()
export class PeopleService{
  private baseUrl: string = 'https://reqres.in/api';
  constructor(private http : Http){
  }

  getAll(){
    let people$ = this.http
      .get(`${this.baseUrl}/users`, { headers: this.getHeaders()})
      .map(mapPersons)
      .catch(handleError);
      return people$;
  }

  getMenuList(){
    let menuData$ = this.http
      .get(`http://localhost:4200/assets/json/menuSample/menuHeaders.json`, {headers: this.getHeaders()})
      .map(mapAppList)
      .catch(handleError);
    return menuData$;
  }

  getDetailMenu(name:string){
    let detMenu$ = this.http
      .get(`http://localhost:4200/assets/json/menuSample/${name}.json`,{headers:this.getHeaders()})
      .map(mapAppList)
      .catch(handleError);
    return detMenu$;
  }

  getMenuData(id:number){
    let menuData$ = this.http
      .get(`${this.baseUrl}/users?page=${id}`,{headers:this.getHeaders()})
      .map(mapPerson)
      .catch(handleError);
    return menuData$;
  }
  getAppList(){
    let appList$ = this.http
      .get(`http://localhost:4200/assets/json/ApplicationList.json`,{headers:this.getHeaders()})
      .map(mapAppList)
      .catch(handleError);
    return appList$;
  }

  postSampleData(data){
    // console.log(data);
    let postList$ = this.http
      .post('https://reqres.in/api/users', data)
      .map(res => res.json())
      .catch(handleError);
    return postList$;
  }

  postTableData(data){
    // console.log(data);

    let fData = JSON.stringify(data);
    let postTableData$ = this.http
      .post('http://localhost:4215/api/Main', fData, {headers: this.postHeaders()})
      .map(res => res.json())
      .catch(handleError);
    // console.log(postTableData$);
    return postTableData$;
  }
  delSampleData(id:number){
    let delList$ = this.http
      .delete(`https://reqres.in/api/users/${id}`)
      .map(res => res.json())
      .catch(handleError);
    return delList$;
  }
  updateSampleData(id:number,data){
    let updateList$ = this.http
      .put(`https://reqres.in/api/users/${id}`,data)
      .map(res => res.json())
      .catch(handleError)
    return updateList$;
  }
  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  private postHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    return headers;
  }

  getHeaderList(){
    let headerData$ = this.http
      .get(`http://localhost:4200/assets/json/headerStructure.json`, {headers: this.getHeaders()})
      .map(mapAppList)
      .catch(handleError);
    return headerData$;
  }

  getActualData(entity){
	let data = JSON.stringify(entity);
    let actualData$ = this.http
      .get(`http://localhost:4215/api/Main?tablevalue=`+encodeURIComponent(data), {headers: this.getHeaders()})
      .map(mapAppList)
      .catch(handleError);
    return actualData$;
  }

  get(id: number) {
    let person$ = this.http
      .get(`${this.baseUrl}/users/${id}`, {headers: this.getHeaders()})
      .map(mapPerson)
      .catch(handleError);
      return person$;
  }

  getGaftTemplate(){
    let gaftData$ = this.http
      .get(`${this.baseUrl}/unknown`, {headers:this.getHeaders()})
      .map(mapPerson)
      .catch(handleError);
    return gaftData$;
  }

  getAllAppData(id:number,name:string){
    let appData$ = this.http
      .get(`${this.baseUrl}/unknown?buid=${id}&admin=${name}`, {headers:this.getHeaders()})
      .map(mapAppList)
      .catch(handleError);
    return appData$;
    // console.log("id-"+id+"\n name-"+name);
  }
  save(person: Person) : Observable<Response>{
    // this won't actually work because the StarWars API doesn't 
    // is read-only. But it would look like this:
    return this
      .http
      .put(`${this.baseUrl}/users/${person.id}`, 
            JSON.stringify(person), 
            {headers: this.getHeaders()});
  }

}


function mapPersons(response:Response){
  //throw new Error('ups! Force choke!');

  // The response of the API has a results
  // property with the actual results
  return response.json().data
}
function mapAppList(response:Response){
  return response.json();
}
function toPerson(r:any): Person{
  let person = <Person>({
    id: r.id,
    name: r.first_name,
    avatar: r.avatar
  });
  console.log('Parsed person:', person);
  return person;
}

// to avoid breaking the rest of our app
// I extract the id from the person url
function extractId(personData:any){
  let extractedId = personData.url.replace('http://reqres.in/api/users/','').replace('/','');
  return parseInt(extractedId);
}

function mapPerson(response:Response): Person{
   // toPerson looks just like in the previous example
  //  return toPerson(response.json().data);
   return response.json().data;
}

// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}

