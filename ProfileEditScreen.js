//ProfileEditScreen
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
//import { fetchUserDataFromDatabase, updateUserDataInDatabase } from './databaseFunctions';
import { AuthContext } from './AuthContext';
import BaseLayout from './BaseLayout';
import CountryCodes from './CountryCodes';
import Countries from './Constantes'; // Importez la liste des pays
import { useLanguage } from './LanguageContext'; // Assurez-vous d'importer votre hook de langue
import { ThemeProvider, ThemeContext } from './ThemeContext';
import { defaultTheme, darkTheme, lightTheme} from './Theme';
import { selectDatabaseFunctions } from './DBSelection'; // Utilisez selectDatabaseFunctions


const ProfileEditScreen = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [emailError, setEmailError] = useState('');
    const { translations } = useLanguage();
    const { changeTheme } = useContext(ThemeContext);
    const { themeMode } = useContext(ThemeContext);
    const theme = themeMode === 'dark' ? darkTheme : (themeMode === 'light' ? lightTheme : defaultTheme);

    const isValidEmail = email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

     const handleEmailChange = (text) => {
        handleChange('Email', text);
        if (!isValidEmail(text)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError('');
        }
    };

    const [userData, setUserData] = useState({
        Name: '',
        Surname: '',
        Email: '',
        Age: '', // Valeur par défaut
        Gender: '',
        Phone: '',
        Location: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const DB = await selectDatabaseFunctions();
            if (user && user.id && DB.fetchUserDataFromDatabase) {
                const data = await DB.fetchUserDataFromDatabase(user.id);
                if (data) {
                    setUserData(data); // Mettre à jour l'état avec les données récupérées
                }
            }
        };

        fetchUserData();
    }, [user]);

    const handleUpdateProfile = async () => {
        const DB = await selectDatabaseFunctions();
        try {
            if (DB.updateUserDataInDatabase) {
                await DB.updateUserDataInDatabase(user.id, userData);
                Alert.alert("Success", "Your data has been updated successfully", [{ text: "OK", onPress: () => navigation.goBack() }]);
            }
        } catch (error) {
            console.error("Error during user data update:", error);
        }
    };

    const handleChange = (name, value) => {
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <BaseLayout navigation={navigation}>
            <ScrollView style={theme.ProfileEditScreenContainer}>
                <View style={theme.ProfileEditScreenFormContainer}>
                    <Text style={theme.ProfileEditScreenTitle}>{translations['ProfileEditScreen']['editProfile']}</Text>

                    <View style={theme.ProfileEditScreenField}>
                        <Text style={theme.ProfileEditScreenLabel}>{translations['ProfileEditScreen']['name']}</Text>
                        <TextInput
                            style={theme.ProfileEditScreenInput}
                            placeholder={translations['ProfileEditScreen']['namePlaceholder']}
                            value={userData.Name}
                            onChangeText={text => handleChange('Name', text)}
                        />
                    </View>
                    <View style={theme.ProfileEditScreenField}>
                        <Text style={theme.ProfileEditScreenLabel}>{translations['ProfileEditScreen']['surname']}</Text>
                        <TextInput
                            style={theme.ProfileEditScreenInput}
                            placeholder={translations['ProfileEditScreen']['surnamePlaceholder']}
                            value={userData.Surname}
                            onChangeText={text => handleChange('Surname', text)}
                        />
                    </View>

                    <View style={theme.ProfileEditScreenField}>
                        <Text style={theme.ProfileEditScreenLabel}>{translations['ProfileEditScreen']['email']}</Text>
                        <TextInput
                            style={theme.ProfileEditScreenInput}
                            placeholder={translations['ProfileEditScreen']['emailPlaceholder']}
                            value={userData.Email}
                            onChangeText={handleEmailChange}
                        />
                    </View>
                    {emailError ? <Text style={theme.ProfileEditScreenErrorText}>{emailError}</Text> : null}

                    <View style={theme.ProfileEditScreenField}>
                        <Text style={theme.ProfileEditScreenLabel}>{translations['ProfileEditScreen']['phone']}</Text>
                        <TextInput
                            style={theme.ProfileEditScreenInput}
                            placeholder={translations['ProfileEditScreen']['phonePlaceholder']}
                            value={userData.Phone}
                            onChangeText={text => handleChange('Phone', text)}
                        />
                    </View>

                    <View style={theme.ProfileEditScreenField}>
                        <Text style={theme.ProfileEditScreenLabel}>{translations['ProfileEditScreen']['age']}</Text>
                        <View style={theme.ProfileEditScreenPickerBorder}>
                            <Picker
                                selectedValue={userData.Age}
                                style={theme.ProfileEditScreenPicker}
                                onValueChange={(itemValue) => handleChange('Age', itemValue)}
                            >
                                {Array.from({ length: 75 }, (_, i) => i + 16).map((age) => (
                                    <Picker.Item key={age} label={`${age}`} value={`${age}`} />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={theme.ProfileEditScreenField}>
                        <Text style={theme.ProfileEditScreenLabel}>{translations['ProfileEditScreen']['gender']}</Text>
                        <View style={theme.ProfileEditScreenPickerBorder}>
                            <Picker
                                selectedValue={userData.Gender}
                                style={theme.ProfileEditScreenPicker}
                                onValueChange={(itemValue) => handleChange('Gender', itemValue)}
                            >
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                    </View>

                    <View style={theme.ProfileEditScreenField}>
                        <Text style={theme.ProfileEditScreenLabel}>{translations['ProfileEditScreen']['location']}</Text>
                        <View style={theme.ProfileEditScreenPickerBorder}>
                            <Picker
                                selectedValue={userData.Location}
                                style={theme.ProfileEditScreenPicker}
                                onValueChange={(itemValue) => handleChange('Location', itemValue)}
                            >
                                {Countries.map((country, index) => (
                                    <Picker.Item key={index} label={country} value={country} />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={handleUpdateProfile}
                        style={theme.ProfileEditScreenButton}
                        disabled={emailError !== ''}
                    >
                        <Text style={theme.ProfileEditScreenButtonText}>{translations['ProfileEditScreen']['updateProfile']}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </BaseLayout>
    );

};

export default ProfileEditScreen;
