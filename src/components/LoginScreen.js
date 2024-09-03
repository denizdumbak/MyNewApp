import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Yup from 'yup';
import { Formik } from 'formik';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
})
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={values => {
          console.log(values)
          navigation.navigate('todo')
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) =>
          <View style={styles.insideContainer}>
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
              placeholder='Password'
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text style={styles.error} >{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        }
      </Formik>
      <View style={styles.insideContainer}>
      <Text style={styles.text}>If you do not have an account</Text>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('signup')}}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default LoginScreen

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
  insideContainer: {
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
  },
  text:{
    alignSelf:'center',
  }
})