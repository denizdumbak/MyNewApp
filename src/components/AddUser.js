import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers } from '../redux/UserReducer';
import * as Yup from 'yup';
import { Formik } from 'formik';

export default function AddUser({ navigation }) {
    const users = useSelector((state) => state.users.data);

    const dispatch = useDispatch();

    const generateId = (users) => {
        const maxId = users.reduce((max, user) => Math.max(max, parseInt(user.id)), 0);
        return (maxId + 1).toString();
    };

    const handleAddUser = (values) => {
        const newUser = {
            ...values,
            id: generateId(users)
        };
        console.log(values);
        dispatch(addUsers(newUser));
        navigation.goBack();
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phone: Yup.string()
            .matches(/^\d{10}$/, 'Phone number must be 10 digits')
            .required('Phone is required'),
        address: Yup.object().shape({
            street: Yup.string().required('Street is required'),
            suite: Yup.string().required('Suite is required'),
            city: Yup.string().required('City is required'),
            zipcode: Yup.string().required('Zipcode is required'),
        })
    });

    return (
        <Formik
            initialValues={{
                name: '',
                username: '',
                email: '',
                address: {
                    street: '',
                    suite: '',
                    city: '',
                    zipcode: ''
                },
                phone: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddUser}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
                dirty
            }) => (
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                    />
                    {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                    />
                    {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        keyboardType="email-address"
                    />
                    {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Street"
                        value={values.address.street}
                        onChangeText={handleChange('address.street')}
                        onBlur={handleBlur('address.street')}
                    />
                    {touched.address?.street && errors.address?.street && <Text style={styles.error}>{errors.address.street}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Suite"
                        value={values.address.suite}
                        onChangeText={handleChange('address.suite')}
                        onBlur={handleBlur('address.suite')}
                    />
                    {touched.address?.suite && errors.address?.suite && <Text style={styles.error}>{errors.address.suite}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="City"
                        value={values.address.city}
                        onChangeText={handleChange('address.city')}
                        onBlur={handleBlur('address.city')}
                    />
                    {touched.address?.city && errors.address?.city && <Text style={styles.error}>{errors.address.city}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Zipcode"
                        value={values.address.zipcode}
                        onChangeText={handleChange('address.zipcode')}
                        onBlur={handleBlur('address.zipcode')}
                    />
                    {touched.address?.zipcode && errors.address?.zipcode && <Text style={styles.error}>{errors.address.zipcode}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        value={values.phone}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        keyboardType="numeric"
                    />
                    {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

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
        padding: 16,
        marginTop: 25,
    },
    input: {
        borderColor: '#78909C',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        padding: 8,
    },
    button: {
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#0091EA',
        padding: 14,
    },
    buttonDisabled: {
        backgroundColor: '#B0BEC5',
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white'
    },
    error: {
        color: 'red',
        marginBottom: 8,
    }
});
