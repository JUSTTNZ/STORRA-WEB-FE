import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../services/api/userApi';

// Async Thunks
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await userApi.editProfile(profileData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update profile'
      );
    }
  }
);

export const uploadProfilePicture = createAsyncThunk(
  'user/uploadProfilePicture',
  async (file, { rejectWithValue }) => {
    try {
      const response = await userApi.uploadProfilePicture(file);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to upload picture'
      );
    }
  }
);

export const updatePersonalization = createAsyncThunk(
  'user/updatePersonalization',
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await userApi.updatePersonalization(userId, data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update personalization'
      );
    }
  }
);

export const updateLearningGoals = createAsyncThunk(
  'user/updateLearningGoals',
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await userApi.updateLearningGoals(userId, data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update learning goals'
      );
    }
  }
);

// Initial State
const initialState = {
  profile: null,
  preferences: {
    age: '',
    currentClass: '',
    language: '',
    learningStyle: [],
    interests: [],
    excitedAbout: [],
    goals: [],
    daysPerWeek: '',
    timePerDay: '',
  },
  isLoading: false,
  error: null,
};

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setPreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    clearUserError: (state) => {
      state.error = null;
    },
    resetUser: (state) => {
      state.profile = null;
      state.preferences = initialState.preferences;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Upload Profile Picture
      .addCase(uploadProfilePicture.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.profile) {
          state.profile.profilePicture = action.payload.profilePicture;
        }
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Personalization
      .addCase(updatePersonalization.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePersonalization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.preferences = { ...state.preferences, ...action.payload };
      })
      .addCase(updatePersonalization.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Learning Goals
      .addCase(updateLearningGoals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLearningGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.preferences = { ...state.preferences, ...action.payload };
      })
      .addCase(updateLearningGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Actions
export const { setProfile, setPreferences, clearUserError, resetUser } = userSlice.actions;

// Selectors
export const selectUserProfile = (state) => state.user.profile;
export const selectUserPreferences = (state) => state.user.preferences;
export const selectUserLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
