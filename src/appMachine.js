import { createMachine, interpret, assign } from 'xstate';

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
    board: initalBoard,
    turn: 'b',
    you: 'frances'
  },
  states: {
    gameform: {
      on: {
        SUBMIT: {
          target: 'gamesubmitted'
        }
      }
    },
    gamesubmitted:{
      on: {
        COMPLETE: {
          target: 'gameplay'
        },
        INCOMPLETE: {
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