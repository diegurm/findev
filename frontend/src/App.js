import React, { useEffect, useState } from 'react';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [githubUsername, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000,
      },
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Gitbub</label>
            <input
              type="text"
              name="github_username"
              id="github_username"
              required
              value={githubUsername}
              onChange={e => setGithubUsername(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              type="text"
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                id="latitude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img
                src="https://avatars1.githubusercontent.com/u/1062248?s=460&v=4"
                alt="Diego Rodrigues"
              />

              <div className="user-info">
                <strong>Diego Rodrigues</strong>
                <span>Reactjs, React Native, Node.js</span>
              </div>
            </header>
            <p>
              Front-end Developer nas skills: Angular+, React, React native e
              node.js
            </p>
            <a href="https://github.com/diegurm">Acessar perfil no github</a>
          </li>
          <li className="dev-item">
            <header>
              <img
                src="https://avatars1.githubusercontent.com/u/1062248?s=460&v=4"
                alt="Diego Rodrigues"
              />

              <div className="user-info">
                <strong>Diego Rodrigues</strong>
                <span>Reactjs, React Native, Node.js</span>
              </div>
            </header>
            <p>
              Front-end Developer nas skills: Angular+, React, React native e
              node.js
            </p>
            <a href="https://github.com/diegurm">Acessar perfil no github</a>
          </li>
          <li className="dev-item">
            <header>
              <img
                src="https://avatars1.githubusercontent.com/u/1062248?s=460&v=4"
                alt="Diego Rodrigues"
              />

              <div className="user-info">
                <strong>Diego Rodrigues</strong>
                <span>Reactjs, React Native, Node.js</span>
              </div>
            </header>
            <p>
              Front-end Developer nas skills: Angular+, React, React native e
              node.js
            </p>
            <a href="https://github.com/diegurm">Acessar perfil no github</a>
          </li>
          <li className="dev-item">
            <header>
              <img
                src="https://avatars1.githubusercontent.com/u/1062248?s=460&v=4"
                alt="Diego Rodrigues"
              />

              <div className="user-info">
                <strong>Diego Rodrigues</strong>
                <span>Reactjs, React Native, Node.js</span>
              </div>
            </header>
            <p>
              Front-end Developer nas skills: Angular+, React, React native e
              node.js
            </p>
            <a href="https://github.com/diegurm">Acessar perfil no github</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
