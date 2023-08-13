import { useCallback, useLayoutEffect, useReducer, useRef } from 'react';

const useSafeDispatch = (dispatch) => {
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(
    (...args) => {
      if (mountedRef.current) {
        dispatch(...args);
      }
    },
    [dispatch]
  );
};

const asyncReducer = (state, action) => {
  switch (action.type) {
    case 'pending':
      return { status: 'pending', data: null, error: null };
    case 'resolved':
      return { status: 'resolved', data: action.data, error: null };
    case 'rejected':
      return { status: 'rejected', data: null, error: action.error };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const useAsync = (initialState) => {
  const [state, unsafeDisaptch] = useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDisaptch);

  const run = useCallback(
    (promise) => {
      if (!promise) {
        return;
      }
      dispatch({ type: 'pending' });
      promise.then(
        (data) => {
          dispatch({ type: 'resolved', data });
        },
        (error) => {
          dispatch({ type: 'rejected', error });
        }
      );
    },
    [dispatch]
  );

  return { ...state, run };
};
