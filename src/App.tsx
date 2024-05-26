import Header from "./components/header/Header";

const App = () => {
  const arr = [{ id: 1 }];
  const id = 1;
  const todo = arr.find((user) => user.id === id);
  console.log(todo);
  return (
    <>
      <Header />
    </>
  );
};
export default App;
