import { call,takeLatest, put } from 'redux-saga/effects';
import { 
    ADD_CATEGORY_START, 
    DELETE_CATEGORY_START, 
    GET_CATEGORY_START, 
    GET_CATEGORY_TREE_START, 
    UPDATE_CATEGORY_START 
} from "../constant/category.constant";
import { 
    addCategoryToAPI, 
    deleteCategoryFromAPI, 
    fetchCategoryTreeAPI, 
    getCategoryFromAPI, 
    getCategoryTree, 
    updateCategoryFromAPI 
} from '../service/category.service';
import { 
    addCategoryError, 
    deleteCategoryError, 
    getCategoryError, 
    getCategoryStart, 
    getCategorySuccess, 
    getCategoryTreeError, 
    getCategoryTreeStart, 
    getCategoryTreeSuccess, 
    setCategoryTreeStart, 
    updateCategoryError 
} from '../action/category.action';

// Saga to get categories
function* getCategory() {
    try {
        const data = yield getCategoryFromAPI();
        yield put(getCategorySuccess(data));
    } catch (error) {
        yield put(getCategoryError(error.message));
    }
}

// Saga to add a new category
function* addCategory({ payload }) {
    try {
        yield addCategoryToAPI(payload); // Make sure to yield this call
        yield put(getCategoryStart()); // Refresh category list after adding
        yield put(getCategoryTreeStart())
    } catch (error) {
        yield put(addCategoryError(error.message));
    }
}

// Saga to delete a category
function* deleteCategory({ payload }) {
    try {
        yield deleteCategoryFromAPI(payload); // Make sure to yield this call
        yield put(getCategoryStart()); // Refresh category list after deletion
        yield put(getCategoryTreeStart())
    } catch (error) {
        yield put(deleteCategoryError(error.message));
    }
}

// Saga to update a category
function* updateCategory({ payload }) {
    try {
        yield updateCategoryFromAPI(payload); // Make sure to yield this call
        yield put(getCategoryStart()); // Refresh category list after updating
        yield put(getCategoryTreeStart())
    } catch (error) {
        yield put(updateCategoryError(error.message));
    }
}
function* getCategoryTreeSaga() {
  try {
    const data = yield call(fetchCategoryTreeAPI);
    yield put(getCategoryTreeSuccess(data));
   } catch (err) {

    yield put(getCategoryTreeError(err.message));

  }
}


// Root saga for category actions
export default function* categorySaga() {
    yield takeLatest(GET_CATEGORY_START, getCategory);
    yield takeLatest(ADD_CATEGORY_START, addCategory);
    yield takeLatest(DELETE_CATEGORY_START, deleteCategory);
    yield takeLatest(UPDATE_CATEGORY_START, updateCategory);
    yield takeLatest(GET_CATEGORY_TREE_START, getCategoryTreeSaga);
}
