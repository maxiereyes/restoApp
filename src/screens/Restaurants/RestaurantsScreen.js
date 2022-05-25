import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../utils'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import LoadingModal from '../../components/shared/LoadingModal'
import ListRestaurants from './ListRestaurants'

const RestaurantsScreen = () => {
  const navigation = useNavigation()
  const [currentUser, setCurrentUser] = useState(null)
  const [resto, setResto] = useState(null)

  const goToAddRestaurant = () => {
    navigation.navigate(screen.restaurant.addRestaurant)

    // other way
    //navigation.navigate(screen.account.tab, {screen: screen.account.account})
  }

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => setCurrentUser(user))
  }, [])

  useEffect(() => {
    const q = query(
      collection(db, 'restaurants'),
      orderBy('createdAt', 'desc')
    )
    onSnapshot(q, (snapshot) => setResto(snapshot.docs))

  }, [])

  return (
    <View style={styles.container}>
      {
        !resto ? (
          <LoadingModal show text="Cargando" />
        ) : (
          <ListRestaurants data={resto} />
        )
      }

      
      {currentUser ? (
        <Icon 
          reverse
          type='material-community'
          name='plus'
          color={'#00a680'}
          containerStyle={styles.btnContainer}
          onPress={goToAddRestaurant}
        />
      ) : null}
      
    </View>
  )
}

export default RestaurantsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnContainer: {
    position:'absolute',
    bottom: 10,
    right: 10
  }
})