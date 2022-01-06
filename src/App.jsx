import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'
import { useState } from 'react'

function App() {
  // Use initialEmails for state
  const [hideRead, setHideRead] = useState(false)

  const [emails, setEmails] = useState(initialEmails)

  function toggleRead(targetEmail) {
    const updatedEmails = JSON.parse(JSON.stringify(emails))
    const match = updatedEmails.find(email => email.id === targetEmail.id)
    match.read = !match.read
    setEmails(updatedEmails)
  }

  function toggleStarr(email) {
    return !email.starred
  }

  function toggleHideRead() {
    setHideRead(!hideRead)
  }

  function updateStarrState(id, starr) {
    let starrIndex = emails.findIndex(email => email.id === id)
    emails[starrIndex].starred = starr
    let updatedStarrEmails = [...emails]
    setEmails(updatedStarrEmails)
  }

  let emailsToDisplay = emails

  if (hideRead === true) {
    emailsToDisplay = emailsToDisplay.filter(email => !email.read)
  }

  return (
    <div className="app">
      <Header />

      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
          // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
          // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onClick={toggleHideRead}
            />
          </li>
        </ul>
      </nav>
      <main>
        <ul className="emails">
          {emailsToDisplay.map(function (email) {
            return (
              <li className={`email ${email.read ? 'read' : 'unread'}`}>
                <input type="checkbox" checked={email.read} onClick={function () {
                  toggleRead(email)
                }} />
                <input class="star-checkbox" type="checkbox" checked={email.starred}
                onClick={function () {
                  const changeStarrProperty = toggleStarr(email)
                  updateStarrState(email.id, changeStarrProperty)
                }} 
                />
                <span className='title'>{email.sender}</span>
                <span className='title'>{email.title}</span>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export default App
