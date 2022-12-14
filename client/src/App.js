import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Login from './components/login';
import Notes from './components/notesPage';

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const authorize = async () => {
      const token = localStorage.getItem('tokenStore')
      // const isAdmin = JSON.parse(atob(token.split('.')[1])).accountType === 'admin';
      if(token){
        const verified = await axios.get('/verify', {
          headers: {Authorization: token}
        })
        console.log(verified)
        setLogin(verified.data)
        if (verified.data === false) return localStorage.clear()
      } else {
        setLogin(false)
      }
    }
    authorize()
  }, [])

  return (
    <div>
      {
        login ? <Notes setLogin={setLogin}/> : <Login setLogin={setLogin}/>
        //To login to admin panel
        // login ? <Admin setLogin={setLogin}/> : <Login setLogin={setLogin}/>
      }
    </div>
  );
}

export default App;
