import BlueButton from './Components/ApplicationPageComponents/BlueButton/BlueButton';
import Logo from './Components/ApplicationPageComponents/Logo/Logo';
import RedButton from './Components/ApplicationPageComponents/RedButton/RedButton';
import WhiteButton from './Components/ApplicationPageComponents/WhiteButton/WhiteButton';
function App() {
  return (
  <>
  <Logo></Logo>
  <WhiteButton name="Посмотреть историю моих заявок"></WhiteButton>
  <RedButton name="Вернуть в работу"></RedButton>
  <BlueButton name="Отпрaвить заявку"></BlueButton>
  <BlueButton disabled={true} name="Отпрaвить заявку"></BlueButton>

  </>
  );
}

export default App;
