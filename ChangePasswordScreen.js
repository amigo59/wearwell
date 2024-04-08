//ChangePasswordScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import BaseLayout from './BaseLayout';
//import { ChangePassword } from './databaseFunctions';
import { selectDatabaseFunctions } from './DBSelection';
import { AuthContext } from './AuthContext';

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const { user } = useContext(AuthContext); // Récupération de l'utilisateur depuis AuthContext

  const isValidPassword = password => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = async () => {
    // Validation du mot de passe
    if (!isValidPassword(newPassword)) {
      setPasswordError("Password must be at least 8 characters and include a lowercase letter, an uppercase letter, and a number");
      return;
    } else {
      setPasswordError('');
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("The passwords you entered do not match");
      return;
    } else {
      setConfirmPasswordError('');
    }

    // Logique de changement de mot de passe
    if (passwordError === '' && confirmPasswordError === '') {
      try {

        const DB = await selectDatabaseFunctions();
        if (DB && DB.changePassword) {

          await DB.changePassword(user.id, oldPassword, newPassword);
          alert("Password successfully changed");
          navigation.goBack(); // ou rediriger vers une autre page
        }
      } catch (error) {
        alert("Failed to change password: " + error);
      }
    }
  };



  return (
    <BaseLayout navigation={navigation}>
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Old Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={newPassword}
            onChangeText={text => {
              setNewPassword(text);
              if (!isValidPassword(text)) {
                setPasswordError("Invalid password format");
              } else {
                setPasswordError('');
              }
            }}
          />
          {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}

          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              if (newPassword !== text) {
                setConfirmPasswordError("Passwords do not match");
              } else {
                setConfirmPasswordError('');
              }
            }}
          />
          {confirmPasswordError !== '' && <Text style={styles.errorText}>{confirmPasswordError}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5E7C5E',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#5E7C5E',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default ChangePasswordScreen;
