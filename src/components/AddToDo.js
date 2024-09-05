import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { addTodo } from '../redux/ToDoReducer';
import Checkbox from 'expo-checkbox';

export default function AddToDo({ route, navigation }) {
    const { user } = route.params;
    const todos = useSelector((state) => state.todos.data);

    const dispatch = useDispatch();

    const generateId = (todos) => {
        const maxId = todos.reduce((max, todo) => Math.max(max, parseInt(todo.id)), 0);
        return (maxId + 1).toString();
    };

    const handleAddToDo = (values) => {
        const newTodo = {
            userId: parseInt(user.id, 10), 
            id: generateId(todos),          
            title: values.title,            
            completed: values.completed
            
        };
        dispatch(addTodo(newTodo));
        navigation.goBack();
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required')
            .min(3, 'Title must be at least 3 characters long')
            .max(100, 'Title can be at most 100 characters long'),
        completed: Yup.boolean()
            .required('Completion status is required')
            .default(false),
    });

    return (
        <Formik
            initialValues={{
                title: '',
                completed: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddToDo}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
                isValid,
                dirty,

            }) => (
                <View style={styles.container}>
                    <Text style={styles.heading}>Add New To-Do</Text>
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={values.title}
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                    />
                    {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}

                    <View style={styles.checkboxContainer}>
                        <Text style={styles.checkboxLabel}>Completed:</Text>
                        <View style={styles.checkboxRow}>
                            <View style={styles.checkboxWrapper}>
                                <Checkbox
                                    value={values.completed === true}
                                    onValueChange={() => setFieldValue('completed', true)}
                                    color={values.completed === true ? '#0091EA' : undefined}
                                />
                                <Text style={styles.checkboxText}>Yes</Text>
                            </View>
                            <View style={styles.checkboxWrapper}>
                                <Checkbox
                                    value={values.completed === false}
                                    onValueChange={() => setFieldValue('completed', false)}
                                    color={values.completed === false ? '#0091EA' : undefined}
                                />
                                <Text style={styles.checkboxText}>No</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, !(isValid && dirty) && styles.buttonDisabled]}
                        onPress={handleSubmit}
                        disabled={!(isValid && dirty)}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F4F6F8',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 12,
        fontSize: 16,
    },
    checkboxContainer: {
        marginVertical: 20,
    },
    checkboxLabel: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    checkboxRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#0091EA',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#B0BEC5',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 8,
    },
});
