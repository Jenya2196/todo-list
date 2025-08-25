import Main from '@/Components/Screens/Main';
import { TodoProvider } from '@/context/TodoContext';

//grid grid-rows-[20px_1fr_20px]  grid grid-rows-[repeat(10,20px)]
export default function Home() {
  return (
    <TodoProvider>
      <Main />
    </TodoProvider>
  );
}
