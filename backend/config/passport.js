const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('✅ Google Strategy triggered');
      try {
        let user = await User.findOne({ googleId: profile.id });
        console.log('🔍 User lookup result:', user);

        if (!user) {
          console.log('🆕 No user found, creating new user...');
          user = new User({
            username: profile.displayName,
            email: profile.emails?.[0]?.value,
            googleId: profile.id,
          });
          await user.save();
          console.log('💾 User saved:', user);
        } else {
          console.log('👍 Existing user found:', user);
        }

        done(null, user);
      } catch (err) {
        console.error('❌ Error in Google Strategy:', err);
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('💾 Serializing user:', user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log('🔍 Deserializing user with ID:', id);
    const user = await User.findById(id);
    if (!user) {
      console.log('⚠️ User not found in DB during deserialization.');
    } else {
      console.log('✅ User loaded from DB:', user);
    }
    done(null, user);
  } catch (err) {
    console.error('❌ Error in deserializeUser:', err);
    done(err, null);
  }
});
