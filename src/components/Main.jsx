import CardList from './CardList';
import '../assets/css/main.css'
import HowWeWork from './HowWeWork';
import MostSellers from './MostSellers';
import DiscountedProducts from './DiscountedProducts';

function Main() {

  return (
    
    <div className='section'>
      <CardList/>
      <HowWeWork/>
      <MostSellers/>
      <DiscountedProducts/>
    </div>
  )
  
}

export default Main