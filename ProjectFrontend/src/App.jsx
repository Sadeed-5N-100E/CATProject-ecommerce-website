// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import './App.css'
import { createBrowserRouter, RouterProvider, Route , Routes} from 'react-router-dom'
import LandingPage from './LandingPage.jsx' ;
import AddcartPage from './AddcartPage.jsx' ;
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import ViewcartPage from './ViewcartPage.jsx';
import PaymentPage from './PaymentPage.jsx';
import { AuthProvider } from './AuthContext';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />, // Default route (you can change to a homepage component)
  },
  {
    path: "/LandingPage",
    element: <LandingPage />,
  },
  {
    path: "/AddcartPage",
     element: <AddcartPage />,
   },
  {
    path: "/LoginPage",
    element: <LoginPage />,
  },
  {
    path: "/SignupPage",
    element: <SignupPage />,
  },
  {
    path: "/ViewcartPage",
    element: <ViewcartPage />, 
  },
  {
    path: "/PaymentPage",
    element: <PaymentPage />, 
  },
  {
    path: "*", // Catch-all route for undefined paths
    element: <h1>404: Page Not Found</h1>,
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App;