import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup';
import { Formik } from 'formik';
import { updateUser } from '../redux/UserReducer';

export default function UpdateUser({ route, navigation }) {

    const { user } = route.params;

    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        address: Yup.object().shape({
            street: Yup.string().required('Street is required'),
            suite: Yup.string().required('Suite is required'),
            city: Yup.string().required('City is required'),
            zipcode: Yup.string().required('Zipcode is required'),
        }),
        phone: Yup.string().required('Phone is required'),
    });

    return (
        <Formik
            initialValues={{
                id: user.id || '',
                name: user.name || '',
                username: user.username || '',
                email: user.email || '',
                address: {
                    street: user.address?.street || '',
                    suite: user.address?.suite || '',
                    city: user.address?.city || '',
                    zipcode: user.address?.zipcode || '',
                },
                phone: user.phone || '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(updateUser(values));
                navigation.goBack();
            }}
        >
            {({
                handleChange, handleBlur, handleSubmit, values, errors, touched
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
                        style={styles.button}
                        title="Save Changes"
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            )
            }
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
    error: {
        color: 'red',
        marginBottom: 8,
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
})