import './DataTable/datatables.css';
import React, {Component} from 'react';

const $ = require('jquery');
$.DataTable = require('datatables.net');

export class TblMedication extends Component{
    componentDidMount(){
        this.$el = $(this.el)   
        this.$el.DataTable({
            data: this.props.data,
            columns: [
                {title: "Id"},
                {title: "FullUrl"},
                {title: "System"},
                {title: "Code"},
                {title: "Name"},
            ]
        })
    }

    componentWillUnmount(){

    }

    render(){
        return <div> 
            <h1> Medication </h1>
            <table className="display" width="100%" ref={el => this.el = el}></table>
             </div>;
    }
}