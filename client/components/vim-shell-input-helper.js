const inputHelper = editor => {
  editor.addEventListener('mousedown', e => {
    e.stop()
  })
  editor.addEventListener('click', e => {
    e.stop()
  })
  editor.addEventListener('mouseup', e => {
    e.stop()
  })
  editor.addEventListener('dblclick', e => {
    e.stop()
  })
  editor.addEventListener('tripleclick', e => {
    e.stop()
  })
  editor.addEventListener('quadclick', e => {
    e.stop()
  })

  editor.commands.addCommand({
    name: 'remove right',
    bindKey: {win: 'Right', mac: 'Right'},
    exec: editor => 1
  })
  editor.commands.addCommand({
    name: 'remove left',
    bindKey: {win: 'Left', mac: 'Left'},
    exec: editor => 1
  })
  editor.commands.addCommand({
    name: 'remove up',
    bindKey: {win: 'Up', mac: 'Up'},
    exec: editor => 1
  })
  editor.commands.addCommand({
    name: 'remove down',
    bindKey: {win: 'Down', mac: 'Down'},
    exec: editor => 1,
    readOnly: true
  })
}

export default inputHelper
