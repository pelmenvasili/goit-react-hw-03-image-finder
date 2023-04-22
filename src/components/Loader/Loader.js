import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => (
  <div className={css['Loader-container']}>
    <ThreeDots
      height="50"
      width="50"
      radius="9"
      color="#4fa94d"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName="Loader-conatainer"
      visible={true}
    />
  </div>
);

export default Loader;
