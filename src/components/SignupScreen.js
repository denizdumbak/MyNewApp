import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Yup from 'yup';
import { Formik } from 'formik';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number is not valid').required('Phone number is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
})
const SignupScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Formik
        initialValues={{ username: '', email: '', phone: '', password: '', confirmPassword: '' }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          console.log(values)
          navigation.navigate('login')
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) =>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInputStyle}
              placeholder='Username'
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {errors.username && touched.username && (
              <Text style={styles.error} >{errors.username}</Text>
            )}
            <TextInput
              style={styles.textInputStyle}
              placeholder='Email'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text style={styles.error} >{errors.email}</Text>
            )}
            <TextInput
              style={styles.textInputStyle}
              placeholder='Phone Number'
              keyboardType='numeric'
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            {errors.phone && touched.phone && (
              <Text style={styles.error} >{errors.phone}</Text>
            )}
            <TextInput
              style={styles.textInputStyle}
              placeholder='Password'
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text style={styles.error} >{errors.password}</Text>
            )}
            <TextInput
              style={styles.textInputStyle}
              placeholder='Confirm Password'
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.error} >{errors.confirmPassword}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        }
      </Formik>
      <TouchableOpacity />
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#78909C'
  },
  textInputContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 10,
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: '#78909C',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#78909C',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center'
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginLeft: 5,
    marginBottom: 5,
  }
})