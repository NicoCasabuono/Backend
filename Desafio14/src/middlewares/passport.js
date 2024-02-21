import passport from 'passport'

export const passportLocalRegister = passport.authenticate('localRegister', {
    failWithError: true,
    session: false,
})

export const passportLogin= passport.authenticate('localLogin', {
    failWithError: true,
    session: false
   
})


export const passportAuth= passport.authenticate('jwtAuth', {
    failWithError: true,
    session: false,
})

export const sessionAuth= passport.authenticate('jwtAuth', {
    session: false
})