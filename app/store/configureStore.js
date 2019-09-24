import { createStore } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState,
        // trigger redux-devtools
        window.devToolsExtension ? window.devToolsExtension() : undefined
    )
    const unsubscribe = store.subscribe(() => console.log(store.getState()))
    return store
}
