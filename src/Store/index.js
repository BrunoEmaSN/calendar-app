import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { calendarReducer } from "./Calendar/CalendarReducer";
import { UIReducer } from "./UI/UIReducer";

const reducers = combineReducers({
    UI: UIReducer,
    Calendar: calendarReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
)