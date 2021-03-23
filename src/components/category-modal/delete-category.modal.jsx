import React from 'react';
import { Label, Button, Modal, ModalHeader, ModalFooter, Card, CardBody, FormGroup } from 'reactstrap';

const DeleteModal = (props) => {
  const { modal, toggle, deleteCategory, selectRecord, setSelectRecord } = props;

  const startDeletingCategory = () => {
    if (selectRecord.id !== '') {
      deleteCategory(selectRecord);
      setSelectRecord({});
      toggle();
    }
  };

  return (
    <Modal className='modal-rounded' size='md' centered isOpen={modal} toggle={toggle}>
      <Card>
        <ModalHeader className='modal-header' toggle={toggle}>
          Deleting Category
        </ModalHeader>
        <CardBody>
          <FormGroup>
            <Label className='display-span'>{`Do you want to delete this ${selectRecord.name}?`}</Label>
          </FormGroup>

          <ModalFooter className='d-flex flex-wrap justify-content-between'>
            <Button className='w-40x main-btn-caution' onClick={startDeletingCategory}>
              Confirm
            </Button>
            <Button className='w-40x' color='secondary' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </CardBody>
      </Card>
    </Modal>
  );
};

export default DeleteModal;
