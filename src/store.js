import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { createSlice }                                  from "@reduxjs/toolkit"
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {exampleAPI}                from "./app/service";

function reducerFactory(keys){
	let reducers= {}
	let actions = {}
	keys.forEach(key=>{
		const slice = createSlice({
			name: key,
			initialState: {
				status: "none",
				data: 6
			},
			reducers: {
				[key]: (state, action)=>{
					return state= {
						...state,
						data: action.payload,
					}
				}
			}
		})
		reducers= {
			...reducers,
			[key]: slice.reducer
		}
		actions = {
			...actions,
			...slice.actions
		}
	})
	console.log(actions)
	return reducers
}


function createReducer(asyncReducers) {
	return combineReducers({
		[exampleAPI.reducerPath]: exampleAPI.reducer,
		...asyncReducers,
	})
}
function generateStore(stateFragments){
	const store =  configureStore({
		reducer: {
			[exampleAPI.reducerPath]: exampleAPI.reducer
		} ,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(exampleAPI.middleware),
	})
	store.asyncReducers = {}

	function injectReducer(key, reducer){
		store.asyncReducers[key] = reducer
		store.replaceReducer(createReducer(store.asyncReducers))
		return store
	}
	store.injectReducer = injectReducer
	return store
}

export default generateStore

