import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Label, Button, Input, Modal, ModalHeader, ModalFooter, Card, CardBody, FormGroup } from 'reactstrap';

import { selectEditCategories } from '../../redux/main/main.selectors';

const JournalModal = (props) => {
  const { modal, toggle, categories, startJournal, updateJournal, isEditing, setIsEditing, selectRecord, setSelectRecord } = props;
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
    if (isEditing) {
      const data = {
        ...selectRecord,
        categoryId: record.categoryId,
        description: record.description,
        amount: record.amount,
        createdAt: record.createdAt
      };
      setIsEditing(false);
      setRecord(data);
      updateJournal(data);
      setSelectRecord({});
    } else {
      const data = {
        ...record
      };
      startJournal(data);
    }

    toggle();
  };

  const closeState = () => {
    setIsEditing(false);
    setSelectRecord({});
    toggle();
  };

  useEffect(() => {
    if (isEditing) {
      delete selectRecord.category;
      const data = {
        ...selectRecord
      };
      setRecord(data);
    }
  }, [modal]);

  return (
    <Modal className='modal-rounded' size='md' centered isOpen={modal} toggle={toggle}>
      <Card>
        <ModalHeader className='modal-header' toggle={toggle}>
          {isEditing ? 'Editing Journal' : 'Create Journal'}
        </ModalHeader>
        <CardBody>
          <Form onSubmit={(e) => submitRecord(e)}>
            <FormGroup>
              <Label htmlFor='createdAt'>Date</Label>
              <Input
                className='main-input'
                type='date'
                placeholder='Date'
                defaultValue={isEditing ? selectRecord.createdAt.toISOString().substr(0, 10) : null}
                id='createdAt'
                name='createdAt'
                required
                onChange={onRecord}></Input>
            </FormGroup>

            <FormGroup>
              <Label htmlFor='categoryId'>Category</Label>
              <Input className='select-category w-100 main-input' type='select' name='categoryId' id='categoryId' required onChange={onRecord}>
                {categories.map((element, index) => {
                  if (isEditing && element.id === selectRecord.categoryId) {
                    return (
                      <option selected='selected' key={`category-${index}`} value={element.id}>
                        {element.name}
                      </option>
                    );
                  } else {
                    return (
                      <option key={`category-${index}`} value={element.id}>
                        {element.name}
                      </option>
                    );
                  }
                })}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <Input className='main-input' type='text' name='description' placeholder='Description' defaultValue={isEditing ? selectRecord.description : null} required onChange={onRecord}></Input>
            </FormGroup>

            <FormGroup>
              <Label className=''>Amount</Label>
              <Input className='main-input' type='number' name='amount' placeholder='Amount' defaultValue={isEditing ? selectRecord.amount : null} required onChange={onRecord}></Input>
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

const mapStateToProps = createStructuredSelector({
  categories: selectEditCategories
});

export default connect(mapStateToProps)(JournalModal);
