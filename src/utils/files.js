import fs from 'fs'
import readline from 'readline-sync'
import config from '../config'

const loadFile = path => {
  try {
    const data = fs.readFileSync(path, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error(err)
  }
}

const writeFile = (path, data) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (e) {
    console.log(e)
  }
}

export const loadAttendees = (path = config.DEFAULT_ATTENDEES_PATH) => {
  console.log('Loading attendees...')
  return loadFile(path)
}

export const loadLogs = (path = config.DEFAULT_LOGS_PATH) => {
  console.log('Loading logs...')
  return loadFile(path)
}

const updateLogs = (logs, path = config.DEFAULT_LOGS_PATH) => {
  writeFile(path, logs)
}

export const checkChangingLogs = logs => {
  if (logs.length > config.LOGS_CAP) {
    if (readline.keyInYN('It seems your log cap has been updated recently.\nDo you want to remove the oldest logs accordingly?')) {
      logs = logs.slice(logs.length - config.LOGS_CAP)
      updateLogs(logs)
      console.log('Oldest logs removed')
    }
  }
}

export const promptToSave = (list, logs) => {
  if (readline.keyInYN('Is the list fine? (Y)')) {
    console.log('Saving the list...')
    updateLogs(logs)
    console.log('Please paste the following message in slack channel #card-random-fika\n')
    list.map(e => console.log(`${e[0]} - ${e[1]}`))
  } else {
    console.log('Aborting...')
  }
}
