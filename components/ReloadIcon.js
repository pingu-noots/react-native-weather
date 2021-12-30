import React from 'react'
import { View, Platform, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../utils/index'
import  { useEffect, useState, useCallback } from 'react';

export default function ReloadIcon({load}) {
    // 更新処理を行っているかどうか
    const [refreshing, setRefreshing] = useState(false);

    const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

    // 任意の更新処理
    const reload = useCallback(async () => {
        let abortCtrl = new AbortController()

        setRefreshing(true);
        // 非同期処理(実際にはここでデータの更新を行う)
        await sleep(1000);
        await load();
        setRefreshing(false);
        return () => {
            abortCtrl.abort()
          }
    }, []);

    return (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={reload} />
          }>
        </ScrollView>
      );
}

const styles = StyleSheet.create ({
    reloadIcon: {
        position: 'absolute',
        top: 550,
        right: 50
    }
})