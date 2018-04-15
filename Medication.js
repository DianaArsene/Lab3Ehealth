import React, { Component } from 'react';
import './App.css';
import './vendor/bootstrap/css/bootstrap.css';
import {TblMedication} from './TblMedication';


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
        var mydata = [];
        var item = data.entry;
        console.log("alabala",item);
        var itemdata = item.filter(function (item) { return item.resource.id });
        for (var i = 0; i < itemdata.length; i++) {
            mydata[i] = [];
            mydata[i][0] = itemdata[i].resource.id;
            mydata[i][1] = itemdata[i].fullUrl;
            mydata[i][2] = itemdata[i].resource.code.coding[0].system;
            mydata[i][3] = itemdata[i].resource.code.coding[0].code;
            mydata[i][4] = itemdata[i].resource.code.coding[0].display;
        }
        that.setState({
          entry: mydata
        });
      }
    });
  }
  

   
  render() {
    
    if(this.state.entry){
      var medicationData  = this.state.entry;
      console.log(medicationData);
      return (
            <TblMedication data={medicationData}>
            </TblMedication>);
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