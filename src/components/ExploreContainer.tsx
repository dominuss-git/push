import { useCallback } from 'react';
import './ExploreContainer.css';
import { Clipboard } from '@capacitor/clipboard';

interface ContainerProps {
  token: string
 }

const ExploreContainer: React.FC<ContainerProps> = ({ token }) => {

  const onClick = useCallback(() => {
    Clipboard.write({
      string: token,
    })
    // navigator.clipboard.writeText(token)
  }, [token])

  return (
    <div id="container">
      <strong onClick={onClick}>Token : {token}</strong>
      <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;
