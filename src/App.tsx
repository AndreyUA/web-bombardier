import { useState, useEffect, useReducer, ChangeEvent, Reducer } from "react";
import axios from "axios";

import "./App.scss";

interface CurrentReportProps {
  requests: number;
  success: number;
  failed: number;
  status: boolean;
}

enum ActionsTypes {
  addRequest = "addRequest",
  addSuccess = "addSuccess",
  addFailed = "addFailed",
  changeStatus = "changeStatus",
  initialState = "initialState",
}

interface ActionsProps {
  type:
    | ActionsTypes.addFailed
    | ActionsTypes.addRequest
    | ActionsTypes.addSuccess
    | ActionsTypes.changeStatus
    | ActionsTypes.initialState;
}

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

function App() {
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

        console.log("TICK !!! ", url);
      }, 200);

      return () => {
        clearInterval(bombardierRequest);
      };
    }
  }, [isSubmit]);

  useEffect(() => {
    if (!isSubmit) {
      dispatch({ type: ActionsTypes.initialState });
      dispatch({ type: ActionsTypes.initialState });
    }
  }, [isSubmit]);

  return (
    <div className="App">
      <header className="App_header">
        <h1>Web Bombardier</h1>
      </header>
      <main>
        <form className="App_form" onSubmit={handleSubmit}>
          <input
            value={url}
            onChange={handleUrlChange}
            type="text"
            placeholder="enter your URL!"
          />
          <input
            disabled={!url.length}
            type="submit"
            value={isSubmit ? "STOP" : "START"}
          />
        </form>
        <div className="App_display">
          <p>
            <span>Requests:</span>
            <span>{currentReportState.requests}</span>
          </p>
          <p>
            <span>Success:</span>
            <span>{currentReportState.success}</span>
          </p>
          <p>
            <span>Failed:</span>
            <span>{currentReportState.failed}</span>
          </p>
          <p>
            <span>Status:</span>
            <span>{currentReportState.status ? "ON" : "OFF"}</span>
          </p>
        </div>
      </main>
      <footer className="App_footer">
        <p>Builded with ReactJS and VITE.</p>
        <p>
          <a href="https://github.com/AndreyUA/web-bombardier">AndreyUA</a>
          <span> 2022.</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
