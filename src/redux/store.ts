import { combineReducers, configureStore } from '@reduxjs/toolkit'
import quizReducer from './slices/quiz.slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const rootReducer = combineReducers({
  quiz: quizReducer
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default configureStore({
  reducer: rootReducer
});