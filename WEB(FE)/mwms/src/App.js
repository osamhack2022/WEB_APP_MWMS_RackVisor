import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ServiceIntroducePage from './pages/ServiceIntroducePage';
import SignupPage from './pages/SignupPage';
import UnitManagementPage from './pages/UnitManagementPage';
import AuthRoute from './utils/AuthRoute';

function App() {
  return (
    <div className="App">
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<MainPage />}></Route>
					<Route path="/login" element={<LoginPage />}></Route>
          <Route path="/introduce" element={<ServiceIntroducePage/>}></Route>
          <Route path="/signup" element={<SignupPage/>}></Route>
          <AuthRoute exact path="/unitmanage" component={UnitManagementPage} />
				</Routes>
			</BrowserRouter>
		</div>
  );
}

export default App;
