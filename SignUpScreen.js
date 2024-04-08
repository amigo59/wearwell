//SignUpScreen
import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { getDB } from './db';
import CountryCodes from './CountryCodes';
import { registerUser } from './databaseFunctions';



const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('16');
    const [gender, setGender] = useState('Male');
    const [style, setStyle] = useState('Casual');
    // Ajouter des états pour les nouveaux champs
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');;
    const [registrationDate, setRegistrationDate] = useState(new Date().toISOString().split('T')[0]); // Date actuelle formatée en YYYY-MM-DD
    const [profilePictureURL, setProfilePictureURL] = useState('');

    const isValidEmail = email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = password => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const availableStyles = ['Sport', 'Casual', 'Classic', 'Urban', 'Business Casual', 'Streetwear', 'Elegant', 'Bohemian'];
    const [selectedStyles, setSelectedStyles] = useState([]);
    const [phoneCountryCode, setPhoneCountryCode] = useState(CountryCodes[0].value);
    const [selectedLabel, setSelectedLabel] = useState(CountryCodes[0].value); // Commencez avec le code du premier pays

    const handleValueChange = (itemValue, itemIndex) => {
        setPhoneCountryCode(itemValue);
        // Mettez à jour le label sélectionné avec juste le code
        setSelectedLabel(itemValue);
    };

    const toggleStyle = (style) => {
        // Cette fonction bascule l'état de sélection pour un style donné
        setSelectedStyles(prevStyles => {
            if (prevStyles.includes(style)) {
                // Si le style est déjà sélectionné, retirez-le
                return prevStyles.filter(s => s !== style);
            } else {
                // Sinon, ajoutez le style à la sélection
                return [...prevStyles, style];
            }
        });
    };

    const validateEmail = () => {
        if (!isValidEmail(email)) {
            setEmailError("Please enter a valid email address");
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = () => {
        if (!isValidPassword(password)) {
            setPasswordError("Password must be at least 8 characters and include a lowercase letter, an uppercase letter, and a number");
            return false;
        }
        setPasswordError('');
        return true;
    };

    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError("The passwords you entered do not match");
            return false;
        }
        setConfirmPasswordError('');
        return true;
    };


    const handleSignUp = () => {
        const db = getDB();
        const fullPhoneNumber = phoneCountryCode + phone;


        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
                let errorMessage = '';
                if (!isEmailValid) errorMessage += emailError + '\n';
                if (!isPasswordValid) errorMessage += passwordError + '\n';
                if (!isConfirmPasswordValid) errorMessage += confirmPasswordError;
                Alert.alert("Error", errorMessage);
                return;
        }


        const userData = {
            name, surname, email, password, registrationDate, profilePictureURL,
            age, location, phone: phoneCountryCode + phone, gender, selectedStyles
        };

        registerUser(userData,
            () => {
                Alert.alert(
                    "Registration Successful",
                    "Your data has been sent. Please check your email and click on the account activation link.",
                    [{ text: "Back to Login", onPress: () => navigation.navigate('Login') }]
                );
            },
            (error) => {
                console.error('Error', error);
                Alert.alert('Error', 'Registration failed');
            }
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={require('./assets/wearwell.png')} style={styles.logo} resizeMode="cover" />
            <View style={styles.signUpContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} placeholder="Enter name" value={name} onChangeText={setName} />
                <Text style={styles.label}>Surname</Text>
                <TextInput style={styles.input} placeholder="Enter surname" value={surname} onChangeText={setSurname} />
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder="Enter email" value={email} onChangeText={setEmail} onBlur={validateEmail} />{emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} placeholder="Enter password" secureTextEntry value={password} onChangeText={setPassword}  onBlur={validatePassword}/>{passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
                 <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        onBlur={validateConfirmPassword}
                 />{confirmPasswordError !== '' && <Text style={styles.errorText}>{confirmPasswordError}</Text>}
                <Text style={styles.label}>Age</Text>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={age} style={styles.picker} onValueChange={(itemValue) => setAge(itemValue)}>
                        {Array.from({ length: 75 }, (_, i) => i + 16).map((age) => (
                            <Picker.Item key={age} label={`${age}`} value={`${age}`} />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.label}>Gender</Text>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={gender} style={styles.picker} onValueChange={(itemValue) => setGender(itemValue)}>
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
                </View>

                <Text style={styles.label}>Location</Text>
                <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />

                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.phoneContainer}>
                    <View style={styles.countryCodePickerContainer}>
                        <Picker
                            selectedValue={phoneCountryCode}
                            onValueChange={(itemValue, itemIndex) => setPhoneCountryCode(itemValue)}
                            style={styles.picker}>
                            {CountryCodes.map((countryCode) => (
                                <Picker.Item
                                    key={countryCode.value}
                                    label={`${countryCode.label} `}
                                    value={countryCode.value}
                                />
                            ))}
                        </Picker>
                    </View>
                    <TextInput
                        style={styles.phoneInput}
                        placeholder="Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>

                <Text style={styles.label}>Styles</Text>
                <View style={styles.stylesContainer}>
                    {availableStyles.map((style, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.styleOption, selectedStyles.includes(style) && styles.styleOptionSelected]}
                            onPress={() => toggleStyle(style)}
                        >
                            <Text style={styles.styleText}>{style}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5E7C5E',
    },
    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    signUpContainer: {
        backgroundColor: 'white',
        elevation: 5, // Ajoute une ombre sur Android
        shadowColor: '#000', // Et sur iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderRadius: 15,
        padding: 20,
        marginHorizontal: 20,
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        padding: 15,
        fontSize: 16,
        borderRadius: 10,
        backgroundColor: '#FFF',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'hidden', // Cache les bords du picker pour le borderRadius
    },
    picker: {
        padding: 15,
        backgroundColor: '#FFF',
    },
    phoneContainer: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    countryCodePickerContainer: {
        marginBottom: 10, // Espace entre le Picker et le champ de saisie du téléphone
    },
    phoneInput: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        backgroundColor: '#FFF',
    },
    countryCodePicker: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        overflow: 'hidden',
        color: 'black', // S'assurer que la couleur du texte est visible
        backgroundColor: '#FFF', // Fond blanc pour le picker lui-même
        height: 50, // Assurez-vous que le Picker lui-même a une hauteur suffisante pour être visible
        width: '100%', // S'assurer que le Picker remplit bien son conteneur
    },

    stylesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    styleOption: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    styleOptionSelected: {
        backgroundColor: '#5E7C5E',
        borderColor: '#5E7C5E',
    },
    styleText: {
        color: '#333',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#5E7C5E',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});


export default SignUpScreen;
