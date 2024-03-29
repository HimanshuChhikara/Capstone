import { Routes, Route,Outlet } from 'react-router-dom';
import Home from '../src/routes/home/home.component';
import Navigation  from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import CheckOut from './routes/checkout/checkout.component';
import { useGoogleOneTapLogin } from 'react-google-one-tap-login'



const App = () => {
  useGoogleOneTapLogin({
    onSuccess : (response) => {console.log(response)},
    onError : (error) => console.log(error),
    googleAccountConfigs: {
      client_id: "924163860388-hsaip18ec9cigpnceuru4gpqj35hc5v6.apps.googleusercontent.com"
    }
  })
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element = { <Home />}  />
        <Route path= 'shop/*' element = {<Shop />} />
        <Route path= 'auth' element = {<Authentication />} />
        <Route path= 'checkout' element={<CheckOut />} />
      </Route>
    </Routes>
  );
}

export default App;
