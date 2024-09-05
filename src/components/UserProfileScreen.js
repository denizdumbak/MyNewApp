import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../redux/ToDoReducer';

export default function UserProfile({ route, navigation }) {
    const { user } = route.params;
    const dispatch = useDispatch();
    const { status, error } = useSelector(state => state.todos);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch])

    if (status === "loading") {
        return <Text>Loading...</Text>
    }
    if (status === "failed") {
        return <Text>Error: {error}</Text>
    }



    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{user.name}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Username</Text>
                    <Text style={styles.value}>{user.username}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{user.email}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Phone</Text>
                    <Text style={styles.value}>{user.phone}</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Address</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Street</Text>
                    <Text style={styles.value}>{user.address.street}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Suite</Text>
                    <Text style={styles.value}>{user.address.suite}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>City</Text>
                    <Text style={styles.value}>{user.address.city}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Zipcode</Text>
                    <Text style={styles.value}>{user.address.zipcode}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('todo', { user: user })}
                >
                    <Text style={styles.buttonText} >List To Do's</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('addToDo', { user: user })}
                >
                    <Text style={styles.buttonText} >Add To Do</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
        padding: 16,
        backgroundColor: '#f5f6f7',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#ecf0f1',
        paddingBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#34495e',
    },
    value: {
        fontSize: 16,
        fontWeight: '400',
        color: '#2c3e50',
    },
    buttonContainer: {
        flex:1,
        justifyContent:'space-evenly'
    },
    button: {
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#0091EA',
        padding: 14,
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white'
    },
});
