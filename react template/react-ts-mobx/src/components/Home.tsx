// /components/SomeComponent.tsx
import { observer } from 'mobx-react-lite';
import { useStore } from '../hooks/useStore';

// It is really important to add observer HOC, so data is always updated!
export const Home = observer(() => {
  //const store = useStore();

  //const { todos } = store.userStore;

  return (
    <div>
      {/* {JSON.stringify(todos)} */}
      <li>dssdsd</li>
    </div>
  );
});