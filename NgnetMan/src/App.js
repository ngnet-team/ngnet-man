import './App.css';
import { Request } from './components/Request';
import { Response } from './components/Response';
import { MetaData } from './components/MetaData';
import { AuthProvider } from './contexts/authContext';
import { HttpProvider } from './contexts/httpContext';

function App() {
  return (
    <HttpProvider>
      <AuthProvider>
        <div className='main'>
          <MetaData />
          <Request />
          <Response />
        </div>
      </AuthProvider>
    </HttpProvider>
  );
}

export default App;
