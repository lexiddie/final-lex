import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Label, Button, Input, Modal, ModalHeader, ModalFooter, Card, CardBody, FormGroup } from 'reactstrap';

const RequestModal = (props) => {
  const { modal, toggle, startRequest } = props;
  const [record, setRecord] = useState({});

  const onRecord = (event) => {
    const { value, name } = event.target;
    setRecord({
      ...record,
      [name]: value
    });
  };

  const submitRecord = async (event) => {
    event.preventDefault();
    const data = {
      ...record
    };
    startRequest(data);
    toggle();
  };

  const closeState = () => {
    toggle();
  };

  useEffect(() => {}, [modal]);

  return (
    <Modal className='modal-rounded' size='md' centered isOpen={modal} toggle={toggle}>
      <Card>
        <ModalHeader className='modal-header' toggle={toggle}>
          Create The Parking Lot Request Form.
        </ModalHeader>
        <CardBody>
          <Form onSubmit={(e) => submitRecord(e)}>
            <FormGroup>
              <Label>Name</Label>
              <Input className='main-input' type='text' name='name' placeholder='Name' required onChange={onRecord}></Input>
            </FormGroup>

            <FormGroup>
              <Label>Phone number</Label>
              <Input className='main-input' type='text' name='phone' placeholder='Phone Number' required onChange={onRecord}></Input>
            </FormGroup>

            <FormGroup>
              <Label htmlFor='arrivalTime'>Arrival Time</Label>
              <Input className='main-input' type='time' placeholder='Arrival Time' id='arrivalTime' name='arrivalTime' required onChange={onRecord}></Input>
            </FormGroup>

            <FormGroup>
              <Label htmlFor='departureTime'>Departure Time</Label>
              <Input className='main-input' type='time' placeholder='Departure Time' id='departureTime' name='departureTime' required onChange={onRecord}></Input>
            </FormGroup>

            <FormGroup>
              <Label>Reason</Label>
              <Input className='main-input' type='text' name='reason' placeholder='Reason' required onChange={onRecord}></Input>
            </FormGroup>

            <ModalFooter className='d-flex flex-wrap justify-content-between'>
              <Button className='w-40x main-btn-primary' type='submit'>
                Confirm
              </Button>
              <Button className='w-40x main-btn-caution' onClick={closeState}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </CardBody>
      </Card>
    </Modal>
  );
};

export default connect()(RequestModal);
