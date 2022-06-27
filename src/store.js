import { configureStore }          from '@reduxjs/toolkit'
import { createSlice }             from "@reduxjs/toolkit"
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
export default configureStore({
	reducer: {
		...reducerFactory(["policySelected"]),
		[exampleAPI.reducerPath]: exampleAPI.reducer
	} ,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(exampleAPI.middleware),
})

