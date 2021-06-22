import _ from 'lodash'
import { files } from '../utils'
import config from '../config'

export const includes = (list, pair) => list.some(e => Array.isArray(e) && e.every((o, i) => Object.is(pair[i], o) || Object.is([...pair].reverse()[i], o)))
export const findCombinations = arr => arr.map((v, i) => arr.slice(i + 1).map(w => [v, w])).flat()

export const arrange = (attendees, logs) => {
  const combinations = findCombinations(attendees)
    .filter(i => !includes(logs.map(o=>o.pairs).flat(), i.map(v=>v.tag)))
    .filter(i => i[0].team !== i[1].team)
    .map(o => o.map(v => v.tag))
  let list = []
  let tempList = [...combinations]
  let index = 0
  while (list.length < Math.floor(attendees.length / 2) && index < attendees.length - 1) {
    const tempEle = tempList.shift()
    if (tempEle) {
      list.push(tempEle)
      tempList = tempList.filter(i => !i.includes(tempEle[0]) && !i.includes(tempEle[1]))
    } else {
      list = []
      tempList = [...combinations]
      tempList.splice(0, index++)
    }
  }
  return list
}

export const findPairs = () => {
  const logs = files.loadLogs()
  files.checkChangingLogs(logs)
  const attendees = _.shuffle(files.loadAttendees())

  console.log('Assembling the pair list... ')

  const list = arrange(attendees, logs)

  console.log('\n')
  console.table(list)

  if (list.length < 1) {
    console.error('ERROR: unable to create a valid list, please reduce the log cap or retry')
    console.log('Aborting...')
    return
  }

  logs.push({
    date: new Date().toLocaleDateString(),
    pairs: list,
  })

  if (logs.length > config.LOGS_CAP) {
    logs.shift()
  }

  files.promptToSave(list, logs)
}
