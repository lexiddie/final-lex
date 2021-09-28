import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'moment';

import { Button } from 'reactstrap';

import CustomButton from '../../components/custom-button/custom-button.component';

import RequestModal from '../../components/request-modal/request.modal';
import DeleteModal from '../../components/request-modal/delete-request.modal';

import { firestore } from '../../firebase/firebase.utils';
import { selectRequests } from '../../redux/main/main.selectors';
import { setRequests } from '../../redux/main/main.actions';
import { selectIsSignIn } from '../../redux/user/user.selectors';

import DeleteLogo from '../../assets/delete.png';

import './main.styles.scss';

const StyledTableCell = withStyles((theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  })
)(TableCell);

const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      }
    }
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const Main = (props) => {
  const { setRequests, requests, isSignIn, history } = props;
  const classes = useStyles();
  const [selectRecord, setSelectRecord] = useState({});
  const [modalMain, setModalMain] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const toggleMain = () => {
    setModalMain(!modalMain);
  };

  const toggleDelete = () => {
    setModalDelete(!modalDelete);
  };

  const deletingJournal = (record) => {
    setSelectRecord(record);
    toggleDelete();
  };

  const fetchRequests = () => {
    const journalRef = firestore.collection('requests');
    journalRef.onSnapshot(
      (querySnapshot) => {
        let tempRequests = [];
        querySnapshot.forEach((item) => {
          let data = item.data();
          data = { ...data, createdAt: data.createdAt.toDate() };
          tempRequests.push(data);
        });
        setRequests(tempRequests);
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  };

  const startRequest = async (data) => {
    const requestRef = firestore.collection('requests');
    const recordId = requestRef.doc().id;
    requestRef
      .doc(recordId)
      .set({
        id: recordId,
        name: data.name,
        phone: data.phone,
        arrivalTime: data.arrivalTime,
        departureTime: data.departureTime,
        reason: data.reason,
        createdAt: new Date()
      })
      .then(() => {
        console.log(`Record has been committed`);
      })
      .catch((err) => {
        console.log(`Err has occurred: `, err);
      });
  };

  const deleteRequest = async (data) => {
    const requestRef = firestore.collection('requests');
    requestRef
      .doc(data.id)
      .delete()
      .then(() => console.log(`Delete ${data} is completed`))
      .catch((err) => console.log(`Delete ${data} is error`, err));
  };

  const checkSignIn = () => {
    if (!isSignIn) {
      history.push('/home');
    }
  };

  useEffect(() => {
    checkSignIn();
    fetchRequests();
  }, [isSignIn]);

  return (
    <div className='main'>
      <div>
        <div className='preview'>
          <RequestModal modal={modalMain} toggle={toggleMain} startRequest={startRequest} />
          <DeleteModal modal={modalDelete} toggle={toggleDelete} deleteRequest={deleteRequest} selectRecord={selectRecord} setSelectRecord={setSelectRecord} />

          <div className='next-line'>
            <span className='price display-span'>{`Your total requests: ${requests.length}`}</span>
          </div>

          <div className='next-line'>
            <CustomButton onClick={toggleMain} inverted>
              Create Request
            </CustomButton>
          </div>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>ID</StyledTableCell>
                  <StyledTableCell align='center'>Name</StyledTableCell>
                  <StyledTableCell align='center'>Phone Number</StyledTableCell>
                  <StyledTableCell align='center'>Arrival Time</StyledTableCell>
                  <StyledTableCell align='center'>Departure Time</StyledTableCell>
                  <StyledTableCell align='center'>Reason</StyledTableCell>
                  <StyledTableCell align='center'>Created At</StyledTableCell>
                  <StyledTableCell align='center'>Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((row) => {
                  return (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align='center'>{row.id}</StyledTableCell>
                      <StyledTableCell align='center'>{row.name}</StyledTableCell>
                      <StyledTableCell align='center'>{row.phone}</StyledTableCell>
                      <StyledTableCell align='center'>{row.arrivalTime}</StyledTableCell>
                      <StyledTableCell align='center'>{row.departureTime}</StyledTableCell>
                      <StyledTableCell align='center'>{row.reason}</StyledTableCell>
                      <StyledTableCell align='center'>{Moment.utc(row.createdAt).local().format('DD MMM YYYY HH:mm')}</StyledTableCell>
                      <StyledTableCell align='center'>
                        <Button className='btn-image-transparent' onClick={() => deletingJournal(row)}>
                          <img className='w-25px h-25px' src={DeleteLogo} alt='Delete Logo' />
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isSignIn: selectIsSignIn,
  requests: selectRequests
});

const mapDispatchToProps = (dispatch) => ({
  setRequests: (data) => dispatch(setRequests(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
