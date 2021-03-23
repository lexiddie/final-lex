import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import NumberFormat from 'react-number-format';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'moment';

import { Button, Input } from 'reactstrap';

import CustomButton from '../../components/custom-button/custom-button.component';
import JournalModal from '../../components/journal-modal/journal.modal';
import DeleteModal from '../../components/journal-modal/delete-journal.modal';

import { firestore } from '../../firebase/firebase.utils';

import { selectCurrentUser, selectIsSignIn } from '../../redux/user/user.selectors';
import { selectManipulateJournals, selectAllCategories, selectIndex, selectTotal } from '../../redux/main/main.selectors';
import { setJournals, setCategory } from '../../redux/main/main.actions';

import EditLogo from '../../assets/edit.png';
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
  const { isSignIn, currentUser, history, categories, journals, setJournals, setCategory, currentIndex, total } = props;
  const classes = useStyles();
  const [selectRecord, setSelectRecord] = useState({});
  const [isEditing, setIsEditing] = useState(false);
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

  const updatingJournal = (record) => {
    setSelectRecord(record);
    setIsEditing(true);
    toggleMain();
  };

  const fetchJournals = () => {
    const journalRef = firestore.collection('journals');
    if (currentUser != null) {
      journalRef.where('userId', '==', currentUser.id).onSnapshot(
        (querySnapshot) => {
          let tempJournals = [];
          querySnapshot.forEach((item) => {
            let data = item.data();
            data = { ...data, createdAt: data.createdAt.toDate() };
            tempJournals.push(data);
          });
          setJournals(tempJournals);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    }
  };

  const startJournal = async (data) => {
    const journalRef = firestore.collection('journals');
    const recordId = journalRef.doc().id;
    journalRef
      .doc(recordId)
      .set({
        id: recordId,
        userId: currentUser.id,
        description: data.description,
        amount: parseFloat(data.amount),
        categoryId: data.categoryId,
        createdAt: new Date(data.createdAt)
      })
      .then(() => {
        console.log(`Record has been committed`);
      })
      .catch((err) => {
        console.log(`Err has occurred: `, err);
      });
  };

  const updateJournal = async (data) => {
    const journalRef = firestore.collection('journals');
    journalRef
      .doc(data.id)
      .update({
        categoryId: data.categoryId,
        description: data.description,
        amount: data.amount,
        createdAt: new Date(data.createdAt)
      })
      .then(() => {
        console.log(`Update journal has been committed`);
      })
      .catch((err) => {
        console.log(`Err has occurred: `, err);
      });
  };

  const deleteJournal = async (data) => {
    const journalRef = firestore.collection('journals');
    journalRef
      .doc(data.id)
      .delete()
      .then(() => console.log(`Delete ${data} is completed`))
      .catch((err) => console.log(`Delete ${data} is error`, err));
  };

  const dispatchFilter = (event) => {
    const { value } = event.target;
    setCategory(value);
  };

  const checkSignIn = () => {
    if (!isSignIn) {
      history.push('/home');
    }
  };

  useEffect(() => {
    checkSignIn();
    fetchJournals();
  }, [isSignIn, selectRecord]);

  return (
    <div className='main'>
      <div>
        <div className='preview'>
          <JournalModal
            modal={modalMain}
            toggle={toggleMain}
            startJournal={startJournal}
            updateJournal={updateJournal}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            selectRecord={selectRecord}
            setSelectRecord={setSelectRecord}
          />
          <DeleteModal modal={modalDelete} toggle={toggleDelete} deleteJournal={deleteJournal} selectRecord={selectRecord} setSelectRecord={setSelectRecord} />
          <div className='next-line'>{currentUser != null ? <span className='display-user'>Welcome back {currentUser.displayName}</span> : null}</div>

          <div className='next-line'>
            <NumberFormat className='price display-span' value={total} displayType={'text'} thousandSeparator={true} prefix={'Your total spends ฿'} />
          </div>

          <div className='next-line'>
            <div className='w-10x'>
              <label>Category: </label>
            </div>
            <Input className='select-category w-40x' type='select' name='category' onChange={dispatchFilter}>
              {categories.map((element, index) => {
                if (index !== currentIndex) {
                  return (
                    <option key={`category-${index}`} value={element.id}>
                      {element.name}
                    </option>
                  );
                } else {
                  return (
                    <option selected='selected' key={`category-${index}`} value={element.id}>
                      {element.name}
                    </option>
                  );
                }
              })}
            </Input>
          </div>

          <div className='next-line'>
            <CustomButton onClick={toggleMain} inverted>
              Create Journal
            </CustomButton>
          </div>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>ID</StyledTableCell>
                  <StyledTableCell align='center'>Date</StyledTableCell>
                  <StyledTableCell align='center'>Category</StyledTableCell>
                  <StyledTableCell align='center'>Description</StyledTableCell>
                  <StyledTableCell align='center'>Amount</StyledTableCell>
                  <StyledTableCell align='center'>Edit</StyledTableCell>
                  <StyledTableCell align='center'>Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {journals.map((row) => {
                  return (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align='center'>{row.id}</StyledTableCell>
                      <StyledTableCell align='center'>{Moment.utc(row.createdAt).local().format('DD MMM YYYY')}</StyledTableCell>
                      <StyledTableCell align='center'>{row.category}</StyledTableCell>
                      <StyledTableCell align='center'>{row.description}</StyledTableCell>
                      <StyledTableCell align='center'>
                        <NumberFormat className='price' value={row.amount} displayType={'text'} thousandSeparator={true} prefix={'฿'} />
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <Button className='btn-image-transparent' onClick={() => updatingJournal(row)}>
                          <img className='w-25px h-25px' src={EditLogo} alt='Edit Logo' />
                        </Button>
                      </StyledTableCell>
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
  currentUser: selectCurrentUser,
  journals: selectManipulateJournals,
  categories: selectAllCategories,
  currentIndex: selectIndex,
  total: selectTotal,
  isSignIn: selectIsSignIn
});

const mapDispatchToProps = (dispatch) => ({
  setJournals: (data) => dispatch(setJournals(data)),
  setCategory: (categoryId) => dispatch(setCategory(categoryId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
