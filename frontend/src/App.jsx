import "mapbox-gl/dist/mapbox-gl.css";
import React, { Fragment, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import Home from "./pages/Home/Home";
import setAuthToken from "./utils/setAuthToken";
import Line from "./pages/Line/Line";
import Memory from "./pages/Memory/Memory";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./theme/theme";
import CreateNewLine from "./pages/CreateNewLine/CreateNewLine";
import MemoryEditor from "./pages/MemoryEditor/MemoryEditor";
import NotFound from "./pages/NotFound/NotFound";
import CustomSnackbar from "./components/snackbar/CustomSnackbar";
import Landing from "./pages/Landing/Landing";
import Loading from "./components/Loading";
import EditLine from "./pages/EditLine/EditLine";
import "mapbox-gl/dist/mapbox-gl.css";
import Profile from "./pages/Profile/Profile";
import MemoriesCalendar from "./pages/MemoriesCalendar/MemoriesCalendar";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
        <ThemeProvider theme={theme}>
          <Router>
            <Fragment>
              <CustomSnackbar />
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/register" component={SignUp} />
                <Route exact path="/landing" component={Landing} />
                <PrivateRoute exact path="/line/:lineId" component={Line} />
                <PrivateRoute
                  exact
                  path="/memory/:memoryId"
                  component={Memory}
                />
                <PrivateRoute
                  exact
                  path="/add-line"
                  component={CreateNewLine}
                />
                <PrivateRoute
                  exact
                  path="/edit-line/:lineId"
                  component={EditLine}
                />
                <PrivateRoute
                  exact
                  path="/line/:lineId/add-memory"
                  component={MemoryEditor}
                />
                <PrivateRoute
                  exact
                  path="/memory/:memoryId/edit"
                  component={MemoryEditor}
                />
                <PrivateRoute
                  exact
                  path="/calendar"
                  component={MemoriesCalendar}
                />
                <PrivateRoute exact path="/profile" component={Profile} />
                <Route component={NotFound} />
              </Switch>
            </Fragment>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
