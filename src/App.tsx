import { useState, useEffect, useReducer, ChangeEvent, FC } from "react";
import axios from "axios";

import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Display from "./components/Display/Display";
import Footer from "./components/Footer/Footer";

import { CurrentReportProps, ActionsTypes, ActionsProps } from "./types";
import "./App.scss";

const initialState = {
  requests: 0,
  success: 0,
  failed: 0,
  status: false,
};

function reducer(state: CurrentReportProps, action: ActionsProps) {
  switch (action.type) {
    case ActionsTypes.addRequest:
      return { ...state, requests: state.requests + 1 };
    case ActionsTypes.addSuccess:
      return { ...state, success: state.success + 1 };
    case ActionsTypes.addFailed:
      return { ...state, failed: state.failed + 1 };
    case ActionsTypes.changeStatus:
      return { ...state, status: !state.status };

    default:
      return initialState;
  }
}

const App: FC = () => {
  const [url, setUrl] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [currentReportState, dispatch] = useReducer(reducer, initialState);

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (new URL(url)) {
      setIsSubmit((prevState) => !prevState);
      dispatch({ type: ActionsTypes.changeStatus });
    }
  };

  useEffect(() => {
    if (isSubmit) {
      const bombardierRequest = setInterval(async () => {
        dispatch({ type: ActionsTypes.addRequest });

        try {
          const response = await axios.get(url);

          if (response.data) {
            dispatch({ type: ActionsTypes.addSuccess });
          }
        } catch (error) {
          console.log(error);

          dispatch({ type: ActionsTypes.addFailed });
        }
      }, 200);

      return () => {
        clearInterval(bombardierRequest);
      };
    }
  }, [isSubmit]);

  useEffect(() => {
    if (!isSubmit) {
      dispatch({ type: ActionsTypes.initialState });
    }
  }, [isSubmit]);

  return (
    <div className="App">
      <Header />
      <main>
        <Form
          handleSubmit={handleSubmit}
          url={url}
          handleUrlChange={handleUrlChange}
          isSubmit={isSubmit}
        />
        <Display
          requests={currentReportState.requests}
          success={currentReportState.success}
          failed={currentReportState.failed}
          status={currentReportState.status}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
