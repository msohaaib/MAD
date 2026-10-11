import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { colors } from '../theme';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import MenuScreen from '../screens/customer/MenuScreen';
import ItemDetailScreen from '../screens/customer/ItemDetailScreen';
import CartScreen from '../screens/customer/CartScreen';
import OrdersScreen from '../screens/customer/OrdersScreen';
import OrderTrackingScreen from '../screens/customer/OrderTrackingScreen';
import ReservationsScreen from '../screens/customer/ReservationsScreen';
import BookTableScreen from '../screens/customer/BookTableScreen';
import ProfileScreen from '../screens/customer/ProfileScreen';
import ManagerDashboard from '../screens/manager/ManagerDashboard';
import ManageMenuScreen from '../screens/manager/ManageMenuScreen';
import MenuFormScreen from '../screens/manager/MenuFormScreen';
import ManageOrdersScreen from '../screens/manager/ManageOrdersScreen';
import ManageReservationsScreen from '../screens/manager/ManageReservationsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function tabIcon(name) {
  return ({ color, size }) => <Ionicons name={name} size={size} color={color} />;
}

function CustomerTabs() {
  const { count } = useCart();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
      }}
    >
      <Tab.Screen name="MenuTab" component={MenuScreen} options={{ title: 'Menu', tabBarIcon: tabIcon('restaurant-outline') }} />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{ title: 'Cart', tabBarBadge: count || undefined, tabBarIcon: tabIcon('bag-outline') }}
      />
      <Tab.Screen name="OrdersTab" component={OrdersScreen} options={{ title: 'Orders', tabBarIcon: tabIcon('receipt-outline') }} />
      <Tab.Screen name="ReserveTab" component={ReservationsScreen} options={{ title: 'Book', tabBarIcon: tabIcon('calendar-outline') }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile', tabBarIcon: tabIcon('person-outline') }} />
    </Tab.Navigator>
  );
}

function ManagerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
      }}
    >
      <Tab.Screen name="DashTab" component={ManagerDashboard} options={{ title: 'Floor', tabBarIcon: tabIcon('grid-outline') }} />
      <Tab.Screen name="MenuTab" component={ManageMenuScreen} options={{ title: 'Menu', tabBarIcon: tabIcon('fast-food-outline') }} />
      <Tab.Screen name="OrdersTab" component={ManageOrdersScreen} options={{ title: 'Orders', tabBarIcon: tabIcon('receipt-outline') }} />
      <Tab.Screen name="BookTab" component={ManageReservationsScreen} options={{ title: 'Bookings', tabBarIcon: tabIcon('calendar-outline') }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile', tabBarIcon: tabIcon('person-outline') }} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function CustomerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="CustomerTabs" component={CustomerTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} options={{ title: 'Dish' }} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} options={{ title: 'Tracking' }} />
      <Stack.Screen name="BookTable" component={BookTableScreen} options={{ title: 'Reserve' }} />
    </Stack.Navigator>
  );
}

function ManagerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="ManagerTabs" component={ManagerTabs} options={{ headerShown: false }} />
      <Stack.Screen name="MenuForm" component={MenuFormScreen} options={{ title: 'Dish' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { restoring, user, isManager } = useAuth();

  if (restoring) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
        <ActivityIndicator color={colors.primary} />
        <Text style={{ color: colors.muted, marginTop: 8 }}>Restoring session…</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user ? <AuthStack /> : isManager ? <ManagerStack /> : <CustomerStack />}
    </NavigationContainer>
  );
}
