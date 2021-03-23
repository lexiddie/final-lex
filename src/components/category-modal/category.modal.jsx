import React, { useState } from 'react';
import { Form, Label, Button, Input, Modal, ModalHeader, ModalFooter, Card, CardBody, FormGroup } from 'reactstrap';

const CategoryModal = (props) => {
  const { modal, toggle, startCategory, updateCategory, isEditing, setIsEditing, selectRecord, setSelectRecord } = props;
  const [record, setRecord] = useState({});

  const onRecord = (event) => {
    const { value, name } = event.target;
    setRecord({
      ...record,
      [name]: value
    });
  };

  const submitRecord = (e) => {
    e.preventDefault();
    if (isEditing) {
      const data = {
        ...selectRecord,
        name: record.name
      };
      setIsEditing(false);
      setRecord(data);
      updateCategory(data);
      setSelectRecord({});
    } else {
      startCategory(record);
    }
    toggle();
  };

  const closeState = () => {
    setIsEditing(false);
    setSelectRecord({});
    toggle();
  };

  return (
    <Modal className='modal-rounded' size='md' centered isOpen={modal} toggle={toggle}>
      <Card>
        <ModalHeader className='modal-header' toggle={toggle}>
          {isEditing ? 'Editing Category' : 'Create Category'}
        </ModalHeader>
        <CardBody>
          <Form onSubmit={(e) => submitRecord(e)}>
            <FormGroup>
              <Label>Name</Label>
              <Input className='main-input' type='text' name='name' placeholder='Name' defaultValue={isEditing ? selectRecord.name : null} required onChange={onRecord}></Input>
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

export default CategoryModal;
