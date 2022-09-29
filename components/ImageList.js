import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

// components
import CardImage from './CardImage'

export default function ImageList({photos}) {
    const renderItem = ({item}) => (
        <CardImage image={item} />
    )
  return (
    <View>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
       />
    </View>
  )
}

const styles = StyleSheet.create({})