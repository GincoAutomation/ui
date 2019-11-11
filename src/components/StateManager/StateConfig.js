import React from 'react';
import useGlobalHook from 'use-global-hook';
import * as actions from '../actions';

const initialState = {
  counterA: 0,
  counterB: 0
};

const useGlobal = useGlobalHook(initialState, actions);

export default useGlobal;
