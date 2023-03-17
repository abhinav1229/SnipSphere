import './css/App.css'
import './css/topics.css'
import './css/code.css'
import './css/snippet.css'
import './css/search.css'
import Header from './Header.jsx'
import Topics from './Topics.jsx'



export default function App() {
  return (
    <main className="main">
      <Header></Header>
      <Topics></Topics>
      {/*
      <Code></Code>
      */}
    </main>
  )
}
