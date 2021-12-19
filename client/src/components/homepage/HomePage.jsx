import './HomePage.css'
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import Poster from './Poster';
import Options from './Options';

const HomePage = () => {
  const NavbarContents = [{name: 'login', link:'/login'}];
  
  return (
      <section className="homepage">
        <div className="container">
          <Navbar contents={NavbarContents}/>
          <div className="main-content">
            <Poster/>
            <Options/>
          </div>
          <Footer/>
        </div>
      </section>
  );
}

export default HomePage;
