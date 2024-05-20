import React, { useEffect } from 'react';
import './material.css';
import './App.css';
import CursorEffect from './components/CursorEffect';
import BoxComponent from './components/BoxComponent';
import Header from './components/Header';

function App() {

	const [token, setToken] = React.useState('');
	const [palettes, setPalettes] = React.useState([]);

	const handleLogin = (type) => {
		fetch('http://127.0.0.1:5000/api/login/' + type,
		{
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setToken(data.access_token);
			})
			
	};

	const getAllPalettes = () => {
		fetch('http://127.0.0.1:5000/api/color_palette',
			{
				method: 'GET',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token,
					'Access-Control-Allow-Origin': '*'
				}
			})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				if (data.msg) {
					alert('You must login first!');
					setPalettes([]);
				}
				else {
					setPalettes(data);
				}
				

			})
	}

	const postPalette = (palette) => {
		fetch('http://127.0.0.1:5000/api/color_palette', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify(palette)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				getAllPalettes();
			})
	}

	const deletePalette = (id) => {
		fetch('http://127.0.0.1:5000/api/color_palette/' + id, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-Type': 'application',
				'Authorization': 'Bearer ' + token
			}
		}).then(response => response.json())
			.then(data => {
				console.log(data);
				getAllPalettes();
			})
	}

	useEffect(() => {
		console.log('Colors palettes:', palettes);
	}, [palettes]);

	useEffect(() => {
		console.log('Token:', token);
	}, [token]);

  return (
	  <div className='App'>
		  
		<CursorEffect />
	    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
			  <Header handleLogin={handleLogin} />
			<main className="mdl-layout__content">
				  <BoxComponent palettes={palettes} setPalettes={setPalettes} getAllPalettes={getAllPalettes} postPalette={postPalette} deletePalette={deletePalette} /> 
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