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

    type Task {
        name: String!
        dueDate: String
        description: String
        isCompleted: Boolean!
        isDue: Boolean!
        isReminderSet: Boolean!
        parentStory: String # TODO: change it to match user story type
        parentProject: String # TODO: change it to match user project type
        repeatEveryInterval: Int
    }

    type Tasks {
        userId: User
        list: [Task]
    }

    type Query {
        getUserData: User
        getUserTasks: Tasks
    }

`;

export default typeDefs;
