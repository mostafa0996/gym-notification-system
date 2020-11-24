const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const config = require('./config');
const User = require('../../modules/user/user.schema');

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.key,
  algorithms: ['HS256']
};

passport.use(
  'jwt',
  new JwtStrategy(jwtOpts, async (payload, done) => {
    try {
      const user = await User.findById(payload._id).lean();
      if (user) {
        return done(null, user);
      }
      done(null, false);
    } catch (err) {
      done(err);
    }
  })
);

module.exports = passport;
