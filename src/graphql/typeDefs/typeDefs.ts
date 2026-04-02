const typeDefs = `#graphql 
    type Subscription {
        name: String
        features: [String]
        price: Float
        currency: String
    }

    type User {
        name: String
        toBeConfirmedEmail: String
        confirmedEmail: String
        birthDate: String
        preferredLanguage: String
        points: Int
        subscription: Subscription
    }

    type Query {
        getUserData: User
    }

`;

export default typeDefs;
