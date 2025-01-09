// App.js

import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, Animated, Share } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './redux/store';
import { addItem, removeItem, toggleItem, editItem, setItems, setPurchasedItems } from './redux/actions';

// Utility function for formatting price
const formatPrice = (price) => `R${parseFloat(price).toFixed(2)}`;

const ShoppingListApp = () => {
  const [input, setInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);
  const purchasedItems = useSelector(state => state.purchasedItems);

  // Handle item addition
  const handleAddItem = () => {
    if (!input.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      name: input.trim(),
      price: parseFloat(priceInput) || 0,
      checked: false,
    };
    dispatch(addItem(newItem));
    setInput('');
    setPriceInput('');
  };

  // Handle sharing
  const handleShare = async () => {
    try {
      const shoppingList = items.map(item => `• ${item.name} - ${formatPrice(item.price)}`).join('\n');
      const message = `My Shopping List:\n\n${shoppingList}\n\nTotal: ${formatPrice(totalPrice)}`;

      await Share.share({ message, title: 'My Shopping List' });
    } catch (error) {
      Alert.alert('Error', 'Failed to share shopping list');
    }
  };

  // Calculate total price
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <TouchableOpacity onPress={handleShare}>
        <Icon name="share-alt" size={24} color="#4CAF50" />
      </TouchableOpacity>
      
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Item Name"
      />
      <TextInput
        style={styles.input}
        value={priceInput}
        onChangeText={setPriceInput}
        placeholder="Price (R)"
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleAddItem}>
        <Icon name="plus" size={24} color="#4CAF50" />
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name}</Text>
            <Text>{formatPrice(item.price)}</Text>
            <TouchableOpacity onPress={() => dispatch(toggleItem(item.id))}>
              <Icon name={item.checked ? 'check-circle' : 'circle-o'} size={24} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(removeItem(item.id))}>
              <Icon name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
      
      <Text>Total: {formatPrice(totalPrice)}</Text>

      {/* Purchased Items */}
      <FlatList
        data={purchasedItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={{ textDecorationLine: 'line-through' }}>{item.name}</Text>
            <Text>{formatPrice(item.price)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ShoppingListApp />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
