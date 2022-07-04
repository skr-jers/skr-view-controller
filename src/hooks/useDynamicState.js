import { useStore} from "react-redux";
import {createSlice}           from "@reduxjs/toolkit";
import {useState}              from "react";

const createGenericSlice = ({
	                              name = '',
	                              initialState= {
		                              // eslint-disable-next-line no-restricted-globals
		                              "status": 'new',
		                              data: null
	                              },
	                              reducers,
                              }) => {
	return createSlice({
		name,
		initialState,
		reducers: {
			start(state) {
				state.status = 'loading'
			},
			/**
			 * If you want to write to values of the state that depend on the generic
			 * (in this case: `state.data`, which is T), you might need to specify the
			 * State type manually here, as it defaults to `Draft<GenericState<T>>`,
			 * which can sometimes be problematic with yet-unresolved generics.
			 * This is a general problem when working with immer's Draft type and generics.
			 */
			success(state, action) {
				state.data = action.payload
				state.status = 'finished'
			},
			...reducers,
		},
	})
}


export const useDynamicState = (key)=> {
	const {injectReducer} = useStore()
	//
	const [isFirstLoad, setIsFirstLoad] = useState(true)
	if (!key) return {}
	const {reducer, actions} = createGenericSlice({
		name: key,
		initialState: {data: null, status: 'new'},
		reducers: {}
	} )
	if (isFirstLoad && key ){
		setIsFirstLoad(false)
		injectReducer( key, reducer )
	}



	return {
		...actions
	}
}