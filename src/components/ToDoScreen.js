import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo } from '../redux/ToDoReducer';
import { useEffect } from 'react';

export default function ToDoScreen({ route }) {
  const { user } = route.params;
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    console.log('Attempting to delete todo with id:', id);
    dispatch(deleteTodo(id));
  };

  const userTodos = useSelector(state => state.todos.data);
  console.log('User ID:', user.id);
  console.log('User Todos:', userTodos);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <FlatList
        data={userTodos.filter(todo => todo.userId.toString() === user.id)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View style={styles.todoTextContainer}>
              <Text style={styles.todoTitle}>{item.title}</Text>
              <Text style={item.completed ? styles.completed : styles.notCompleted}>
                {item.completed ? "Completed" : "Not Completed"}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
  },
  completed: {
    marginTop: 4,
    fontSize: 14,
    color: '#27ae60',
  },
  notCompleted: {
    marginTop: 4,
    fontSize: 14,
    color: '#e74c3c',
  },
  deleteButton: {
    alignSelf: 'center',
    backgroundColor: '#F44336',
    height: 35,
    width: 70,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    fontWeight: 'bold',
    color: 'white'
  },
});
