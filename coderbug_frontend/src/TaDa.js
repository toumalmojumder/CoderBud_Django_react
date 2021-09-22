import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddTaDaModal} from './AddTaDaModal';
import {EditTaDaModal} from './EditTaDaModal';
export class TaDa extends Component{

    constructor(props){
        super(props);
        this.state={tadas:[],emps:[], addModalShow:false, editModalShow:false, editModalShow:false}
    }
    refreshList(){
        fetch(process.env.REACT_APP_API+'tada')
        .then(response=>response.json())
        .then(data=>{
            this.setState({tadas:data});
        });

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

    deleteTaDa(tadaid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'tada/'+tadaid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {tadas, tadaid,date,tadaname,travel,lunch,instrument,paid }=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});


        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Employee Name</th>
                        <th>Travel cost</th>
                        <th>Lunch cost</th>
                        <th>Instruments cost</th>
                        <th>Paid</th>
                        <th>Options</th>

                        </tr>
                    </thead>
                    <tbody>
                        {tadas.map(tada=>

                            <tr key={tada.Id}>
                                <td>{tada.date}</td>
                                <td>{tada.employee_name}</td>
                                <td>{tada.travel_cost}</td>
                                <td>{tada.lunch_cost}</td>
                                <td>{tada.instruments_cost}</td>
                                <td>{tada.paid}</td>

                                <td >
                                    <ButtonToolbar>
                                        <Button className="mx-auto" variant="info" onClick={()=>this.setState({editModalShow:true,
                                            tadaid:tada.Id,
                                            date:tada.date,
                                            tadaname:tada.employee_name,
                                            travel:tada.travel_cost,
                                            lunch:tada.lunch_cost,
                                            instrument:tada.instruments_cost,
                                            paid:tada.paid})}>
                                            Edit
                                        </Button>

                                        <Button className="mx-auto" variant="danger" onClick={()=>this.deleteTaDa(tada.Id)}>
                                            Delete
                                        </Button>

                                        <EditTaDaModal show={this.state.editModalShow} onHide={editModalClose}
                                        tadaid={tadaid}
                                        date= {date}
                                        tadaname={tadaname}
                                        travel={travel}
                                        lunch={lunch}
                                        instrument={instrument}
                                        paid={paid}

                                         />
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    <Button class="mx-auto" variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add TADA Bill</Button>

                    <AddTaDaModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}