import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';
export class Employee extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false, editModalShow:false}
    }
    refreshList(){
        fetch(process.env.REACT_APP_API+'employeename')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'employeename/'+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, empid,empname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});


        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                        <th>EmployeeName</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.EmployeeId}>
                                <td>{emp.EmployeeId}</td>
                                <td>{emp.EmployeeName}</td>
                                <td >
                                    <ButtonToolbar>
                                        <Button className="mx-auto" variant="info" onClick={()=>this.setState({editModalShow:true, empid:emp.EmployeeId,empname:emp.EmployeeName})}>
                                            Edit
                                        </Button>

                                        <Button className="mx-auto" variant="danger" onClick={()=>this.deleteEmp(emp.EmployeeId)}>
                                            Delete
                                        </Button>

                                        <EditEmpModal show={this.state.editModalShow} onHide={editModalClose} empid={empid} empname={empname}/>
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    <Button class="mx-auto" variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Employee</Button>

                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}