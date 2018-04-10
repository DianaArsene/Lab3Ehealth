import React, { Component } from 'react';
import './App.css';
import './vendor/bootstrap/css/bootstrap.css';


class Medication extends Component {
	constructor() {
		super();
		this.state =  {};
    
    var that = this;
    var url = 'http://hapi.fhir.org/baseDstu3/Medication?_format=json&_pretty=true'
  
    fetch(url).then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      if(data !=null){
        that.setState(data);
      }
    });
  }
  

   
  render() {
    
    if(this.state.entry){
      console.log(this.state);
      return (<div>
        <div>
          <h1> Medication </h1>
        </div>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">FullUrl</th>
              <th scope="col">System</th>
              <th scope="col">Code</th>
              <th scope="col">Name</th>

            </tr>
          </thead>
          <tbody>
        {this.state.entry.map((item) => (
            <tr>
              <td>{item.resource.id}</td>
              <td>{item.fullUrl}</td>
              <td>{item.resource.code.coding.map((index) => ( index.system))} 
              </td>
              <td>{item.resource.code.coding.map((index) => ( index.code))} 
              </td>
              <td>{item.resource.code.coding.map((index) => ( index.display))} 
              </td>
            </tr>        
        ))}
        </tbody>
        </table>  
        </div>);
    }else{
      return (
        <div>
          Test other
        </div>
        );
    }
  }
}
export default Medication;