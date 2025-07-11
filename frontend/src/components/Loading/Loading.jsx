import { OrbitProgress } from 'react-loading-indicators';
import './Loading.css';
const Loading = () => {
  return (
    <div className="loading-bubble">
      <OrbitProgress color={['#32cd32', '#327fcd', '#cd32cd', '#cd8032']} />
    </div>
  );
};
export default Loading;
