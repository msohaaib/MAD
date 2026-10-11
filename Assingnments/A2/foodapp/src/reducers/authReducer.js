export const initialAuthState = {
  user: null,
  token: null,
  restoring: true,
};

export function authReducer(state, action) {
  switch (action.type) {
    case 'RESTORE':
      return {
        user: action.user,
        token: action.token,
        restoring: false,
      };
    case 'LOGIN':
      return {
        user: action.user,
        token: action.token,
        restoring: false,
      };
    case 'LOGOUT':
      return {
        user: null,
        token: null,
        restoring: false,
      };
    default:
      return state;
  }
}
