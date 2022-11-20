import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import Orders from './pages/orders';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <h1>Hello word!</h1>
          <p>Go to the <Link to="/orders">/orders</Link> route to see the list of orders.</p>
        </Route>
        <Route exact path="/orders">
          <Orders/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
