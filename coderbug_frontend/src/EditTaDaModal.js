import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditTaDaModal extends Component{
    constructor(props){
        super(props);
        this.state={emps:[],paids:[]}
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'employeename')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });

        fetch(process.env.REACT_APP_API+'paid')
        .then(response=>response.json())
        .then(data=>{
            this.setState({paids:data});
        });
    }


    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'tada/',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:event.target.Id.value,
                date:event.target.date.value,
                employee_name:event.target.employee_name.value,
                travel_cost:event.target.travel_cost.value,
                lunch_cost:event.target.lunch_cost.value,
                instruments_cost:event.target.instruments_cost.value,
                paid:event.target.paid.value,

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed '+ error);
        })
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit TADA Bill
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="Id">
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text"  name="Id" required 
                        placeholder="Id"
                        disabled
                        defaultValue={this.props.tadaid}
                        />
                    </Form.Group>
                <Form.Group controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                        type="date"
                        name="date"
                        required
                        placeholder="Date"
                        defaultValue={this.props.date}
                        />
                    </Form.Group>

                    <Form.Group controlId="employee_name">
                        <Form.Label>Employee Name</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.tadaname}>
                        {this.state.emps.map(emp=>
                            <option key={emp.EmployeeId}>{emp.EmployeeName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="travel_cost">
                        <Form.Label>Travel cost</Form.Label>
                        <Form.Control type="number" pattern="^\d*(\.\d{0,2})?$" name="travel_cost" required 
                        placeholder="travel_cost"
                        defaultValue={this.props.travel}
                        />
                    </Form.Group>

                    <Form.Group controlId="lunch_cost">
                        <Form.Label>Lunch Cost</Form.Label>
                        <Form.Control type="number" pattern="^\d*(\.\d{0,2})?$" name="lunch_cost" required 
                        placeholder="lunch_cost"
                        defaultValue={this.props.lunch}
                        />
                    </Form.Group>

                    <Form.Group controlId="instruments_cost">
                        <Form.Label>Instruments Cost</Form.Label>
                        <Form.Control type="number" pattern="^\d*(\.\d{0,2})?$" name="instruments_cost" required 
                        placeholder="instruments_cost"
                        defaultValue={this.props.instrument}
                        />
                    </Form.Group>

                    <Form.Group controlId="paid">
                        <Form.Label>paid</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.paid}>
                        {this.state.paids.map(paid=>
                            <option key={paid.PaidId}>{paid.Paid}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Button  variant="primary" type="submit">
                            Update TADA Bill
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
            
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}