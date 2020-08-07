import { spawn, takeEvery, put, call } from 'redux-saga/effects'

// yield [call((api, xx)), call(api,xx)]
// yield take('a')
// const task = yield fork('xx')
// cancel(task)
// canceled 
// if (yield canceled())


function* fetchList () {
  // call 执行一个异步任务，会卡死后面的
  // const data = yield call (api.xxx, action.payload)
  // const data = yield api.xxx()
  // yield put({type: 'request_success', data})
  yield put ({type: 'ADD', data: { title: '2'}})
}

function* resetList  () {
  yield put({ type: 'RESET', data: [] })
}

function* watchFetchData () {
  // 执行一个异步任务，会卡死后面的 不想卡死的话可以用taskeLatest
  yield takeEvery('FETCH_LIST', fetchList)
}

function* watchRestData () {
  yield takeEvery('RESET_LIST', resetList)
}


export default function *rootSaga () {
  console.log('Sage run ')
  yield spawn(watchFetchData)
  yield spawn(watchRestData)
}