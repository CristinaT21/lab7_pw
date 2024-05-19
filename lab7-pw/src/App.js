import React from 'react';
// import SVG from 'svg.js'; 
import './material.css';
import './App.css';
import CursorEffect from './components/CursorEffect';
import BoxComponent from './components/BoxComponent';
import Header from './components/Header';

function App() {
  return (
	  <div className='App'>
		  
		<CursorEffect />
	    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
			<Header />
			<main className="mdl-layout__content">
				<BoxComponent /> 
			  </main>
			  <footer class="footer">
				  <small>
              © 2024 made with &#10084; by -
              <a href="https://www.linkedin.com/in/cristina-%C8%9B%C4%83rn%C4%83-568735152/"> Cristina Țărnă </a>
            </small>
          </footer>
		</div>
	</div>
  );
}

export default App;