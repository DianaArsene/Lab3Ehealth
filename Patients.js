import React, { Component } from 'react';
import './App.css';
import { browserHistory } from 'react-router'
import './vendor/bootstrap/css/bootstrap.css';
import $ from 'jquery';
import {Tbl} from './Tbl';


class Patients extends Component {
    constructor() {
        super();
        this.state = {};

        var that = this;
        var url = 'http://hapi.fhir.org/baseDstu3/Patient?_format=json&_pretty=true';
        var url1 = 'http://hapi.fhir.org/baseDstu3/Encounter?_format=json&_pretty=true';
        var url2 = 'http://hapi.fhir.org/baseDstu3/CarePlan?_format=json&_pretty=true';
        var url3 = 'http://hapi.fhir.org/baseDstu3/Appointment?_format=json&_pretty=true';



        fetch(url).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
            .then(function (data) {
                if (data != null) {
                    var mydata = [];
                    var item = data.entry;
                    var itemdata = item.filter(function (item) { return item.resource.name });
                    for (var i = 0; i < itemdata.length; i++) {
                        mydata[i] = [];
                        mydata[i][0] = itemdata[i].resource.id;
                        mydata[i][1] = itemdata[i].fullUrl;
                        mydata[i][2] = itemdata[i].resource.name[0].family;
                        mydata[i][3] = itemdata[i].resource.name[0].given[0];
                        mydata[i][4] = (itemdata[i].resource.gender!=undefined) ? itemdata[i].resource.gender : "not found";
                        mydata[i][5] = (itemdata[i].resource.birthDate!=undefined) ? itemdata[i].resource.birthDate : "not found";
                        mydata[i][6] = "<button type='button' class='btn btn-white'><a href='Detalii/" + 
                        itemdata[i].resource.id +"'>Details</a></button>";
                    }

                    that.setState({
                        entry: mydata
                    });
                }
                
            });
    }

    render() {
        if (this.state.entry) {
            var patientsData = this.state.entry.filter(function (item) { return item[2] });
            console.log(patientsData);
            return (
            <Tbl data={patientsData}>
            </Tbl>);
        } else {
            return (
                <div>
                    No data so far ......
                </div>
            );
        }
    }
}
export default Patients;