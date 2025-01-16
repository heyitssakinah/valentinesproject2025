import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom'
import SecretHomePage from '../components/SecretHomePage';

export function Home() {
  

  const { userLoggedIn } = useAuth()
  const navigate = useNavigate()


  
  return (
    <>
      {!userLoggedIn ? (
        navigate('/login')
      ) : (
        <SecretHomePage>
          
        </SecretHomePage>
          
        )}
        </>
      );
}
