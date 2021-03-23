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
import CategoryModal from '../../components/category-modal/category.modal';
import DeleteModal from '../../components/category-modal/delete-category.modal';

import { firestore } from '../../firebase/firebase.utils';

import { selectCurrentUser, selectIsSignIn } from '../../redux/user/user.selectors';
import { selectCategories } from '../../redux/main/main.selectors';
import { setCategories } from '../../redux/main/main.actions';

import EditLogo from '../../assets/edit.png';
import DeleteLogo from '../../assets/delete.png';

import './category.styles.scss';

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

const Category = (props) => {
  const { isSignIn, currentUser, history, categories, setCategories } = props;
  const classes = useStyles();
  const [selectRecord, setSelectRecord] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [modalCategory, setModalCategory] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const toggleCategory = () => {
    setModalCategory(!modalCategory);
  };

  const toggleDelete = () => {
    setModalDelete(!modalDelete);
  };

  const deletingCategory = (record) => {
    setSelectRecord(record);
    toggleDelete();
  };

  const updatingCategory = (record) => {
    setSelectRecord(record);
    setIsEditing(true);
    toggleCategory();
  };

  const fetchCategories = () => {
    const categoryRef = firestore.collection('categories');
    if (currentUser != null) {
      categoryRef.where('userId', '==', currentUser.id).onSnapshot(
        (querySnapshot) => {
          let tempCategories = [];
          querySnapshot.forEach((item) => {
            let data = item.data();
            data = { ...data, createdAt: data.createdAt.toDate() };
            tempCategories.push(data);
          });
          console.log(`Checking realtime firing category`);
          setCategories(tempCategories);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    }
  };

  const startCategory = async (data) => {
    const categoryRef = firestore.collection('categories');
    const recordId = categoryRef.doc().id;
    categoryRef
      .doc(recordId)
      .set({
        id: recordId,
        userId: currentUser.id,
        name: data.name,
        createdAt: new Date()
      })
      .then(() => {
        console.log(`Record has been committed`);
      })
      .catch((err) => {
        console.log(`Err has occurred: `, err);
      });
  };

  const updateCategory = async (data) => {
    console.log(`Checking Update`, data);
    const categoryRef = firestore.collection('categories');
    categoryRef
      .doc(data.id)
      .update({
        name: data.name
      })
      .then(() => {
        console.log(`Update category has been committed`);
      })
      .catch((err) => {
        console.log(`Err has occurred: `, err);
      });
  };

  const deleteCategory = async (data) => {
    const categoryRef = firestore.collection('categories');
    categoryRef
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
    fetchCategories();
  }, [isSignIn]);

  return (
    <div className='main'>
      <div>
        <div className='preview'>
          <CategoryModal
            modal={modalCategory}
            toggle={toggleCategory}
            startCategory={startCategory}
            updateCategory={updateCategory}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            selectRecord={selectRecord}
            setSelectRecord={setSelectRecord}
          />
          <DeleteModal modal={modalDelete} toggle={toggleDelete} deleteCategory={deleteCategory} selectRecord={selectRecord} setSelectRecord={setSelectRecord} />
          <div className='next-line'>{currentUser != null ? <span className='display-user'>Welcome back {currentUser.displayName}</span> : null}</div>

          <div className='next-line'>
            <CustomButton onClick={toggleCategory} inverted>
              Create Category
            </CustomButton>
          </div>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>ID</StyledTableCell>
                  <StyledTableCell align='center'>Name</StyledTableCell>
                  <StyledTableCell align='center'>Created At</StyledTableCell>
                  <StyledTableCell align='center'>Edit</StyledTableCell>
                  <StyledTableCell align='center'>Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((row) => {
                  return (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align='center'>{row.id}</StyledTableCell>
                      <StyledTableCell align='center'>{row.name}</StyledTableCell>
                      <StyledTableCell align='center'>{Moment.utc(row.createdAt).local().format('DD MMM YYYY')}</StyledTableCell>
                      <StyledTableCell align='center'>
                        <Button className='btn-image-transparent' onClick={() => updatingCategory(row)}>
                          <img className='w-25px h-25px' src={EditLogo} alt='Edit Logo' />
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <Button className='btn-image-transparent' onClick={() => deletingCategory(row)}>
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
  categories: selectCategories,
  isSignIn: selectIsSignIn
});

const mapDispatchToProps = (dispatch) => ({
  setCategories: (data) => dispatch(setCategories(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));
