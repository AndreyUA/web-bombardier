import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

import "./App.scss";

interface CurrentReportProps {
  requests: number;
  success: number;
  failed: number;
  status: boolean;
}

function App() {
  const initialState = {
    requests: 0,
    success: 0,
    failed: 0,
    status: false,
  };

  const [url, setUrl] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [currentReport, setCurrentReport] =
    useState<CurrentReportProps>(initialState);

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (new URL(url)) {
      setIsSubmit((prevState) => !prevState);
      setCurrentReport((prevState) => ({
        ...prevState,
        status: !prevState.status,
      }));
    }
  };

  useEffect(() => {
    if (isSubmit) {
      const bombardierRequest = setInterval(async () => {
        setCurrentReport((prevState) => ({
          ...prevState,
          requests: prevState.requests + 1,
        }));

        try {
          const response = await axios.get(url);

          if (response.data) {
            setCurrentReport((prevState) => ({
              ...prevState,
              success: prevState.success + 1,
            }));
          }
        } catch (error) {
          console.log(error);

          setCurrentReport((prevState) => ({
            ...prevState,
            failed: prevState.failed + 1,
          }));
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
      setCurrentReport(initialState);
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
            <span>{currentReport.requests}</span>
          </p>
          <p>
            <span>Success:</span>
            <span>{currentReport.success}</span>
          </p>
          <p>
            <span>Failed:</span>
            <span>{currentReport.failed}</span>
          </p>
          <p>
            <span>Status:</span>
            <span>{currentReport.status ? "ON" : "OFF"}</span>
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
