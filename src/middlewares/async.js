// @flow

function createAsyncActionMiddleware() {
  return () => next => action => {
    const isPromisable =
      action.payload && typeof action.payload.then === 'function';

    if (!isPromisable) {
      return next(action);
    }

    next({
      ...action,
      meta: {
        ...(action.meta || {}),
        isPending: true,
      },
    });

    return action.payload
      .then(
        data => {
          next({...action, payload: data});
          return data;
        },
        error => {
          next({...action, payload: error, error: true});
          return Promise.reject(error);
        }
      )
      .catch(error => {
        throw error;
      });
  };
}

export function getHandlerResult(handler) {
  return (state, action) => {
    if (!handler) {
      return state;
    }
    const result = handler(state, action);
    if (result === undefined) {
      return state;
    }
    return result;
  };
}

export function handleAsyncAction(handlers, defaultState = null) {
  return (state, action) => {
    if (state === undefined) {
      return defaultState;
    }
    if (action.meta && action.meta.isPending) {
      return getHandlerResult(handlers.started)(state, action);
    } else if (!action.error) {
      return getHandlerResult(handlers.succeeded)(state, action);
    } else {
      return getHandlerResult(handlers.failed)(state, action);
    }
  };
}

export default createAsyncActionMiddleware;
