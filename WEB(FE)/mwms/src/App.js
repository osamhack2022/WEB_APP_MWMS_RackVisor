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
					<Route path="/" element={<MainPage />}/>
					<Route path="/login" element={<LoginPage />}/>
          <Route path="/introduce" element={<ServiceIntroducePage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          {/* <AuthRoute path="/unitmanage" component={UnitManagementPage} /> */}
				</Routes>
			</BrowserRouter>
		</div>
  );
}

export default App;
