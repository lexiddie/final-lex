import React from 'react';
import { Label, Button, Modal, ModalHeader, ModalFooter, Card, CardBody, FormGroup } from 'reactstrap';

const DeleteModal = (props) => {
  const { modal, toggle, deleteJournal, selectRecord, setSelectRecord } = props;

  const startDeletingJournal = () => {
    if (selectRecord.id !== '') {
      deleteJournal(selectRecord);
      setSelectRecord({});
      toggle();
    }
  };

  return (
    <Modal className='modal-rounded' size='md' centered isOpen={modal} toggle={toggle}>
      <Card>
        <ModalHeader className='modal-header' toggle={toggle}>
          Create Journal
        </ModalHeader>
        <CardBody>
          <FormGroup>
            <Label className='display-span'>Do you want to delete this journal?</Label>
          </FormGroup>

          <ModalFooter className='d-flex flex-wrap justify-content-between'>
            <Button className='w-40x main-btn-caution' onClick={startDeletingJournal}>
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
