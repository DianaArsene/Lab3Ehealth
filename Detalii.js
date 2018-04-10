import React, { Component } from 'react';
import './App.css';
import './vendor/bootstrap/css/bootstrap.css';

class Detalii extends Component {
    constructor({match, ...props}) {
        super();
        this.state = {};    
    
            let that = this;
            var url = 'http://hapi.fhir.org/baseDstu3/Encounter?_format=json&_pretty=true';
            var url1 = 'http://hapi.fhir.org/baseDstu3/CarePlan?_format=json&_pretty=true';
            var url2 = 'http://hapi.fhir.org/baseDstu3/Appointment?_format=json&_pretty=true';
            fetch(url).then(function(response) {
              if (response.status >= 400) {
                throw new Error("Bad response from server");
              }
              return response.json();
            })
            .then(function(data) {
                if (data != null) {
                   var mydata = [];
                   var item = data.entry;
                  var patienId =match.params.id;
                   var itemdata = item.filter(function (item) { return item.resource.id });
                   for (var i = 0; i < itemdata.length; i++) {
                       var idSplit = (itemdata[i].resource.subject.reference).split('/');
                       if(patienId == idSplit[1])
                       {
                        mydata[i] = {};
                        mydata[i].id = itemdata[i].resource.id;
                        mydata[i].fullUrl = itemdata[i].fullUrl;
                        mydata[i].period = itemdata[i].resource.period.start;
                       // mydata[i].reason = itemdata[i].resource.reason[0].text;
                        mydata[i].status = itemdata[i].resource.status;
                        mydata[i].patient = itemdata[i].resource.subject.reference;
                       }
                                              
                   }
                    that.setState({
                        encounter: mydata
                    });
                }
            });

            fetch(url1).then(function(response) {
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response.json();
              })
              .then(function(data) {
                  if (data != null) {
                    var mydata = [];
                    var item = data.entry;
                   var patienId =match.params.id;
                    var itemdata = item.filter(function (item) { return item.resource.id });
                    for (var i = 0; i < itemdata.length; i++) {
                        var idSplit = (itemdata[i].resource.subject.reference).split('/');
                        if(patienId == idSplit[1])
                        {
                            mydata[i] = {};
                            mydata[i].id = itemdata[i].resource.id;
                            mydata[i].intent = itemdata[i].resource.intent;
                            mydata[i].activity = itemdata[i].resource.activity[0].detail.category.text;
                            mydata[i].periodEnd = itemdata[i].resource.period.end;
                            mydata[i].periodStart = itemdata[i].resource.period.start;
                            mydata[i].status = itemdata[i].resource.status;
                            mydata[i].patient = itemdata[i].resource.subject.reference;
                        }
                        else{
                            mydata[i] = {};
                            mydata[i].id = 0;
                            mydata[i].intent = "No data found!";
                            
                        }
                    }
                      that.setState({
                          careplan: mydata
                          
                      });
                  }
              });

              fetch(url2).then(function(response) {
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response.json();
              })
              .then(function(data) {
                  if (data != null) {
                     
                     var mydata = [];
                     var item = data.entry;
                     var patienId =match.params.id;
                     var itemdata = item.filter(function (item) { return item.resource.id });
                     for (var i = 0; i < itemdata.length; i++) {
                        var idSplit = (itemdata[i].resource.participant[1].actor.reference).split('/');
                        if(patienId == idSplit[1])
                        {
                            mydata[i] = {};
                            mydata[i].id = itemdata[i].resource.id;
                            mydata[i].description = itemdata[i].resource.description;
                            mydata[i].start = itemdata[i].resource.start;
                            mydata[i].end = itemdata[i].resource.end;
                            mydata[i].minutesDuration = itemdata[i].resource.minutesDuration;
                            mydata[i].status = itemdata[i].resource.status;
                            mydata[i].doctor = itemdata[i].resource.participant[0].actor.display;
                            mydata[i].participant = itemdata[i].resource.participant[1].actor.reference;
                        }
                        else{
                            mydata[i] = {};
                            mydata[i].id = 0;
                            mydata[i].intent = "No data found!";
                            
                        }
                     }
                      that.setState({
                        appointment: mydata
                      });
                  }
              });
    }

    render() {  
        var myencounter;
        var mycareplan;
        var myappointment;

        if (this.state.encounter) { 
             myencounter = (
            <div>
            <div>
            <h1> Encounter </h1>
        </div>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">FullUrl</th>
                    <th scope="col">Period</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Status</th>
                    <th scope="col">Patient</th>
                </tr>
            </thead>
            <tbody>
                {this.state.encounter.filter(function (item) { return item.id }).map((item) => (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.fullUrl}</td>
                        <td>{item.period}</td>
                        <td>{item.reason}</td>
                        <td>{item.status}</td>
                        <td>{item.patient}</td>
                    </tr>
                ))}
            </tbody>
        </table>  
        </div>  
        );
        } 
        
        if (this.state.careplan) {
             mycareplan = (
                <div>
                <div>
                <h1> CarePlan </h1>
            </div>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Intent</th>
                        <th scope="col">Activity</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Status</th>
                        <th scope="col">Patient</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {this.state.careplan.filter(function (item) { return item.id }).map((item) => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.intent}</td>
                            <td>{item.activity}</td>
                            <td>{item.periodStart}</td>
                            <td>{item.periodEnd}</td>
                            <td>{item.status}</td>
                            <td>{item.patient}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
            </div>
            );
        }
        if (this.state.appointment) {
             myappointment = (
                <div>
                <div>
                <h1> Appointment </h1>
            </div>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Description</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Minutes Duration</th>
                        <th scope="col">Doctor</th>
                        <th scope="col">Participant</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.appointment.filter(function (item) { return item.id }).map((item) => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.description}</td>
                            <td>{item.start}</td>
                            <td>{item.end}</td>
                            <td>{item.minutesDuration}</td>
                            <td>{item.doctor}</td>
                            <td>{item.participant}</td>
                            <td>{item.status}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
            </div>
            );
        }
        var myhtml  = [];
        myhtml.push(myencounter);
        myhtml.push(mycareplan);
        myhtml.push(myappointment);
        console.log("myhtml ",myencounter);
        return(
            <div>
                {myhtml}
            </div>
        )
    }    
}
export default Detalii;