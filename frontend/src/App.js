import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import { Homepage } from './components/HomePage/homepageindex'
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage/splashpage";
import NewQuestionForm from "./components/NewQuestionForm/questionformindex";
import EditQuestionForm from "./components/EditQuestion/editquestionindex";
import Question from "./components/Questions/questionsindex";
import NewAnswerForm from "./components/NewAnswerForm/newanswerindex";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <SplashPage/>
          </Route>
          <Route exact path='/home'>
            <Homepage />
          </Route>
          <Route exact path='/questions/new'>
            <NewQuestionForm />
          </Route>
          <Route exact path='/questions/:id'>
            <Question />
          </Route>
          <Route exact path='/questions/:id/edit'>
            <EditQuestionForm />
          </Route>
          <Route exact path='/answers/new'>
            <NewAnswerForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
