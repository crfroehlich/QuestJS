declare type TCallback = (data: any) => {};
declare type TStatus = 'resting' | 'mutation' | 'action';
declare type TActions = {
    [key: string]: (store: IStore, data: any) => void;
};
declare type TMutations = {
    [key: string]: (state: TState, data: any) => any;
};
declare type TState = {
    [key: string]: any;
};
interface IStore {
    actions: TActions;
    callbacks: TCallback[];
    initialState: TState;
    mutations: TMutations;
    state: TState;
    status: TStatus;
}
export declare class Store implements IStore {
    actions: TActions;
    mutations: TMutations;
    state: TState;
    status: TStatus;
    callbacks: TCallback[];
    initialState: TState;
    constructor(params: Partial<Store>);
    /**
     * A dispatcher for actions that looks in the actions
     * collection and runs the action if it can find it
     *
     * @param {string} actionKey
     * @param {mixed} payload
     * @returns {boolean}
     * @memberof Store
     */
    dispatch(actionKey: string, payload: any): false | void;
    /**
     * Look for a mutation and modify the state object
     * if that mutation exists by calling it
     *
     * @param {string} mutationKey
     * @param {mixed} payload
     * @returns {boolean}
     * @memberof Store
     */
    commit(mutationKey: string, payload: any): boolean;
    /**
     * Fire off each callback that's run whenever the state changes
     * We pass in some data as the one and only parameter.
     * Returns a boolean depending if callbacks were found or not
     *
     * @param {object} data
     * @returns {boolean}
     */
    processCallbacks(data: TState): boolean;
    /**
     * Allow an outside entity to subscribe to state changes with a valid callback.
     * Returns boolean based on wether or not the callback was added to the collection
     *
     * @param {function} callback
     * @returns {boolean}
     */
    subscribe(callback: TCallback): boolean;
}
export {};
//# sourceMappingURL=store.d.ts.map