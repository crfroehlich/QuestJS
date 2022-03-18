export class Store {
    constructor(params) {
        this.actions = {};
        this.mutations = {};
        this.state = {};
        this.status = 'resting';
        this.callbacks = [];
        this.initialState = {};
        Object.assign(this, params);
        const store = this;
        // Set our state to be a Proxy. We are setting the default state by
        // checking the params and defaulting to an empty object if no default
        // state is passed in
        this.state = new Proxy((params.initialState || {}), {
            set(state, key, value) {
                // Set the value as we would normally
                state[key] = value;
                // Fire off our callback processor because if there's listeners,
                // they're going to want to know that something has changed
                store.processCallbacks(store.state);
                // Reset the status ready for the next operation
                store.status = 'resting';
                return true;
            },
        });
    }
    /**
     * A dispatcher for actions that looks in the actions
     * collection and runs the action if it can find it
     *
     * @param {string} actionKey
     * @param {mixed} payload
     * @returns {boolean}
     * @memberof Store
     */
    dispatch(actionKey, payload) {
        const action = this.actions[actionKey];
        // Run a quick check to see if the action actually exists
        // before we try to run it
        if (!action) {
            console.error(`Action "${actionKey}" doesn't exist.`);
            return false;
        }
        // Let anything that's watching the status know that we're dispatching an action
        this.status = 'action';
        // Actually call the action and pass it the Store context and whatever payload was passed
        return action(this, payload);
    }
    /**
     * Look for a mutation and modify the state object
     * if that mutation exists by calling it
     *
     * @param {string} mutationKey
     * @param {mixed} payload
     * @returns {boolean}
     * @memberof Store
     */
    commit(mutationKey, payload) {
        const mutation = this.mutations[mutationKey];
        // Run a quick check to see if this mutation actually exists
        // before trying to run it
        if (!mutation) {
            console.error(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }
        // Let anything that's watching the status know that we're mutating state
        this.status = 'mutation';
        // Get a new version of the state by running the mutation and storing the result of it
        const newState = mutation(this.state, payload);
        // Update the old state with the new state returned from our mutation
        this.state = newState;
        return true;
    }
    /**
     * Fire off each callback that's run whenever the state changes
     * We pass in some data as the one and only parameter.
     * Returns a boolean depending if callbacks were found or not
     *
     * @param {object} data
     * @returns {boolean}
     */
    processCallbacks(data) {
        if (!this.callbacks.length) {
            return false;
        }
        // We've got callbacks, so loop each one and fire it off
        this.callbacks.forEach((callback) => callback(data));
        return true;
    }
    /**
     * Allow an outside entity to subscribe to state changes with a valid callback.
     * Returns boolean based on wether or not the callback was added to the collection
     *
     * @param {function} callback
     * @returns {boolean}
     */
    subscribe(callback) {
        // A valid function, so it belongs in our collection
        this.callbacks.push(callback);
        return true;
    }
}
//# sourceMappingURL=store.js.map