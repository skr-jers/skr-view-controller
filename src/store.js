import { configureStore }          from '@reduxjs/toolkit'
import { createSlice }             from "@reduxjs/toolkit"
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {exampleAPI}                from "./app/service";

function reducerFactory(resources){
	let reducers= {}
	let actions = {}
	resources.forEach(resource=>{
		const slice = createSlice({
			name: resource,
			initialState: {
				status: "none",
				data: []
			},
			reducers: {
				[resource+"OnWaiting"]: (state, action)=>{
					return state= {
						...state,
						status: "waiting",
					}
				},
				[resource+"OnFailure"]: (state, action)=>{
					return state= {
						status: "failed",
						data: []
					}
				},
				[resource+"OnSuccess"]: (state, action)=>{
					return state= {
						status: "success",
						data: action.payload
					}
				}
			}
		})
		reducers= {
			...reducers,
			[resource]: slice.reducer
		}
		actions= {
			...actions,
			...slice.actions
		}
	})
	return reducers
}
export default configureStore({
	reducer: {
		//...reducerFactory(["companies", "users", "policies"]),
		[exampleAPI.reducerPath]: exampleAPI.reducer
	} ,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(exampleAPI.middleware),
})

