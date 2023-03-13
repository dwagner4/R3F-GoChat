import { createMachine, interpret, assign } from 'xstate';
import { gameWrite, chatWrite } from './dbClient.js'

const initalBoard = [ 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                      'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 
                    ]



const turnlogic = {
  predictableActionArguments: true,
  id: 'turnmachine',
  initial: 'turn',
  states: {
    turn: {
      on: {
        SUBMIT: {
          target: 'notturn',
          actions: [ 'submitSpace', 'updateBoard' ]
        }
      }
    },
    notturn: {
      on: {
        UPDATE: {
          target: 'turn'
        }
      }
    }
  }
}

const logic = {
  predictableActionArguments: true,
  id: 'gogame',
  initial: 'gameform',
  context: {
    gameid: '',
    turn: 0,
    boardstate: initalBoard,
    ko: [],
    blackdead: 0,
    whitedead: 0,
    handicapp: 0,
    history: [],
  },
  on: { 
    DATA_UPDATE: {
      actions: [ 'dataupdate' ]
    }
  },
  states: {
    gameform: {
      on: {
        SUBMIT: {
          target: '',
          actions: [ 'submitSpace' ]
        },
        HAS_GAME_ID: {
          target: 'gamenego',
          actions: [ 'gamewrite' ]
        }
      }
    },
    gamenego:{
      on: {
        COMPLETE: {
          target: 'gameplay'
        },
        DELETE: {
          target: 'gameform'
        }
      }
    },
    gameplay: {
      on: {
        NAV: {
          target: 'playback'
        },
        END: {
          target: 'endgame'
        }
      },
      ...turnlogic
    },
    playback: {
      on: {
        PLAY: {
          target: 'gameplay'
        }
      }
    },
    endgame: {
    },
  }
};

const functions = {
  actions: 
  {
    submitSpace: ( context, event ) => { 
      console.log( 'submit event', event ) 
    },
    gamewrite: ( context, event ) => { 
      gameWrite(event)
    },
    dataupdate: ( context, event ) => {
      console.log("Fuck the data")
    },
    // updateBoard: assign( { you: 'dean' } )
    // updateBoard: assign( () => {return { you: 'dean' } })
    updateBoard: assign( (context, event) => {
      const b = [...context.board]
      b[event.spaceIndex] = context.turn
      const nextTurn = context.turn === 'b' ? 'w' : 'b' ;
      return { you: 'dean', board: b, turn: nextTurn} 
    })
  }
}

const appMachine = createMachine( logic, functions )

const appMachineService = interpret(appMachine)
appMachineService.onTransition(state => console.log(state.value, state.context ) )


appMachineService.start()
// goMachineService.send('START')


export { appMachine, appMachineService }
// export { goMachine } submitSpace submitSpace