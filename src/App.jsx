import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import { useState, useEffect } from 'react';
import { TooltipProvider } from 'react-tooltip';
import Header from './components/Header';
import Form from './components/Form';
import Loading from './components/Loading';
import List from './components/List';
import axios from 'axios';


function App() {
  // state untuk container all todo dari hasil fetching ke server
  const [allTodo, setALlTodo] = useState([]);

  // state sementara untuk atur loading dan terima data
  const [isLoad, setIsLoad] = useState({ loading: false, data: {} });
  const { loading, data } = isLoad;

  // state untuk edit
  const [edit, setEdit] = useState({ isEdit: false, data: {} });


  // fetching all data from api
  const fetchAllTodo = () => {
    setIsLoad({ ...isLoad, loading: true });
    axios.get('https://6392cd1a11ed187986a138ae.mockapi.io/todo').then(res => {
      setALlTodo(res.data);
      setIsLoad({ ...isLoad, loading: false, data: res.data });
    }).catch(err => {
      console.error(err)
      setIsLoad({ loading: false, data: {} });
    });
  }

  // call fetchAllTodo untuk fetching data dari server
  useEffect(() => {
    fetchAllTodo();
  }, []);


  // filter complete & uncomplete todo from mixed todo
  const collectUncompleteTodo = allTodo.filter(todo => {
    return !todo.isComplete
  }).map((data) => {
    return (
      <List key={data.id} check={false} todos={data} refetching={fetchAllTodo} edit={edit} setEdit={setEdit} />
    )
  });

  const collectCompleteTodo = allTodo.filter(todo => {
    return todo.isComplete
  }).map(data => {
    return (
      <List key={data.id} check={true} todos={data} refetching={fetchAllTodo} />
    )
  })

  return (
    <div className="container d-flex justify-content-center">

      <div className="mt-5 text-center todo__container">
        <Header />

        {loading && (
          <Loading>
            <p>Loading...</p>
          </Loading>
        )}

        {!loading && data.length === 0 && (
          <>
            <Loading>
              <p> Oops.. You don't have <br></br> anything todo </p>
            </Loading>
          </>
        )}

        {!loading && data && (
          <>
            <div className='todo__list-container d-block' >
              <div className='todo__uncompleted_container' >
                <TooltipProvider>
                  {collectUncompleteTodo}
                </TooltipProvider>
              </div >

              <div className='todo__completed_container' >
                {collectCompleteTodo}
              </div >
            </div >

          </>
        )}


        <Form edit={edit} setEdit={setEdit} refetching={fetchAllTodo} />
      </div>
    </div >
  )
}

export default App
