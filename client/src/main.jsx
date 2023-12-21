import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import React from 'react'
import ReactDOM from 'react-dom/client'
import {ReactQueryDevtoolsPanel} from "react-query/devtools";
import App from './App.jsx'
import './index.css'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <App/>
          <ReactQueryDevtoolsPanel setIsOpen={true} />
        </LocalizationProvider>
      </QueryClientProvider>
    </React.StrictMode>,
)
