import { goMachineService } from './goMachine.js'

export default function Interface()
{
  let stateStr = 'yoho'
  goMachineService.subscribe( state =>  stateStr = state.toStrings())

  return <div className="interface" >
    {/* <h1>{xstate.toStrings()}</h1> */}
    <h1>{stateStr}</h1>
    <button onClick={() => goMachineService.send({ type: 'START' })}>START</button>
    <button onClick={() => goMachineService.send({ type: 'SUBMIT' })}>SUBMIT</button>
    <button onClick={() => goMachineService.send({ type: 'UPDATE' })}>UPDATE</button>
    <button onClick={() => goMachineService.send({ type: 'NAV' })}>NAV</button>
    <button onClick={() => goMachineService.send({ type: 'PLAY' })}>PLAY</button>
    <button onClick={() => goMachineService.send({ type: 'END' })}>END</button>
  </div>
}