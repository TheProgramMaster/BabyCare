import React, { useState, useReducer } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type AuthState = {
  isLoggedIn: boolean;
  userName: string | null;
  token: string | null;
};

type AuthAction = 
  | { type: 'LOGIN'; payload: { token: string; userName: string } }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        userName: action.payload.userName
      };
    case 'LOGOUT':
      return {
        isLoggedIn: false,
        token: null,
        userName: null
      };
    default:
      return state;
  }
};

interface FormData {
  email: string;
  password: string;
  name: string;
  confirm_password: string;
}

type LoginResponse = {
  success: boolean;
  data?: {
    token: string;
    name: string;
  };
  message: string;
};

export default function ProfileScreen() {
  const [authState, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    userName: null,
    token: null
  });
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    confirm_password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);

      const response = await axios.post<LoginResponse>(
        'https://babycare.abddyesandchem.com/api/login',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success && response.data.data) {
        // Update auth state with token and name
        dispatch({
          type: 'LOGIN',
          payload: {
            token: response.data.data.token,
            userName: response.data.data.name
          }
        });
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      const response = await register(formData);
      if (response.success) {
        dispatch({
          type: 'LOGIN',
          payload: {
            token: response.data.token,
            userName: response.data.name
          }
        });
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear auth state and token
    dispatch({ type: 'LOGOUT' });
    // Clear any stored tokens if needed
  };

  const renderAuthForm = () => (
    <ThemedView style={styles.formContainer}>
      <ThemedText type="title">
        {isRegistering ? 'Register' : 'Login'}
      </ThemedText>
      
      {isRegistering && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={formData.confirm_password}
            onChangeText={(text) => setFormData({...formData, confirm_password: text})}
          />
        </>
      )}
      
      {!isRegistering && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
          />
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={isRegistering ? handleRegister : handleLogin}
      >
        <ThemedText>{isRegistering ? 'Register' : 'Login'}</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <ThemedText>
          {isRegistering 
            ? 'Already have an account? Login' 
            : 'Need an account? Register'}
        </ThemedText>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator />}
      {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
    </ThemedView>
  );

  const renderProfile = () => (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome, {authState.userName}!</ThemedText>
      {/* Add other profile content here */}
      <TouchableOpacity 
        style={styles.button}
        onPress={handleLogout}
      >
        <ThemedText style={styles.buttonText}>
          Logout
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image source={require('@/assets/images/baby.png')} />
      }>
      <ThemedView style={styles.container}>
        {authState.isLoggedIn ? (
          renderProfile()
        ) : (
          renderAuthForm()
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

// Update RegisterResponse type
type RegisterResponse = {
  success: boolean;
  data: {
    token: string;
    name: string;
  };
  message: string;
}

// Update register function
const register = async (formData: FormData): Promise<RegisterResponse> => {
  if (formData.password !== formData.confirm_password) {
    throw new Error('Passwords do not match');
  }

  try {
    const response = await axios.post('https://babycare.abddyesandchem.com/api/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirm_password
    });
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#A1CEDC',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  }
});