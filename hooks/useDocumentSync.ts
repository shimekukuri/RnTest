import {useEffect, useState} from 'react';
import {addEventListener, useNetInfo} from '@react-native-community/netinfo';

export function useDocumentSync() {
  const {isConnected} = useNetInfo();

  useEffect(() => {
    console.log('This network has change', isConnected);
  }, [isConnected]);
}
